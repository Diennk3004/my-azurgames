import { getHashPassword } from "@/utils";
import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { compareSync } from "bcryptjs";
import { Request } from "express";
import { Model } from "mongoose";
import { CreateUserInput, UpdateUserInput } from "./user.input";
import { User } from "./user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private confService: ConfigService,
    private jwt: JwtService,
    private readonly mailerService: MailerService
  ) {}
  create = async (createUserInput: CreateUserInput) => {
    try {
      let userByEmailList = await this.userModel.find({ email: createUserInput.email });
      let userByPhoneList = await this.userModel.find({ $and: [{ phone: createUserInput.phone }, { phone: { $ne: "" } }] });
      if (userByEmailList && userByEmailList.length > 0) {
        throw new BadRequestException("Email is duplicated");
      } else if (userByPhoneList && userByPhoneList.length > 0) {
        throw new BadRequestException("Phone is duplicated");
      }
      const hashPassword = getHashPassword(createUserInput.password);
      createUserInput.password = hashPassword;
      const created = new this.userModel(createUserInput);
      let item = await created.save();
      return item;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  update = async (updateUserInput: UpdateUserInput, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.checkAuthorized(req);
      if (isAuthenticated) {
        await this.userModel.updateOne(
          { _id: updateUserInput.id },
          { email: updateUserInput.email, fullname: updateUserInput.fullname, dialing_code: updateUserInput.dialing_code, phone: updateUserInput.phone }
        );
        let item = this.userModel.findById(updateUserInput.id);
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  checkValidToken = async (token: string) => {
    try {
      let item = await this.userModel.findOne({ token });
      return item;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  checkAuthorized = async (req: Request) => {
    let isAuthenticated: boolean = true;
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      isAuthenticated = false;
    } else {
      const bearerData = bearerHeader.split(" ");
      const bearerTxt = bearerData[0];
      let token = bearerData[1];
      if (bearerTxt !== "Bearer") {
        isAuthenticated = false;
      } else {
        const item = await this.userModel.findOne({ token });
        if (!item) {
          isAuthenticated = false;
        }
      }
    }
    return isAuthenticated;
  };
  getAccount = async (req: Request) => {
    try {
      const isAuthenticated: boolean = await this.checkAuthorized(req);
      if (isAuthenticated) {
        const { headers } = req;
        const bearerHeader = headers["authorization"];
        const bearerData = bearerHeader.split(" ");
        const token = bearerData[1];
        let item = await this.userModel.findOne({ token });
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  login = async (email_phone: string, password: string) => {
    try {
      let userItem: any = null;
      let patternEmail: any = new RegExp("^[a-z][a-z0-9_.]{4,31}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$", "i");
      if (patternEmail.test(email_phone)) {
        userItem = await this.userModel.findOne({ email: email_phone });
      } else {
        userItem = await this.userModel.findOne({ phone: email_phone });
      }
      if (userItem) {
        const checkValidPassword = compareSync(password, userItem.password);
        if (checkValidPassword) {
          const payload = {
            sub: "token login",
            iss: "from server",
            _id: userItem._id,
            email: userItem.email,
            fullname: userItem.fullname,
            phone: userItem.phone
          };
          let token = this.jwt.sign(payload, {
            secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: this.confService.get<string>("JWT_ACCESS_EXPIRE").toString()
          });
          await this.userModel.updateOne({ _id: userItem._id }, { token });
          let item = {
            _id: userItem._id,
            phone: userItem.phone,
            email: userItem.email,
            dialing_code: userItem.dialing_code,
            fullname: userItem.fullname,
            locale: userItem.locale,
            token
          };
          return item;
        } else {
          throw new BadRequestException("Invalid password");
        }
      } else {
        throw new BadRequestException("Email or phone has not been registered");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  loginByEmail = async (email: string) => {
    try {
      let userItem = await this.userModel.findOne({ email });
      if (userItem) {
        const payload = {
          sub: "token login",
          iss: "from server",
          _id: userItem._id,
          email: userItem.email,
          fullname: userItem.fullname,
          phone: userItem.phone
        };
        let token = this.jwt.sign(payload, {
          secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
          expiresIn: this.confService.get<string>("JWT_ACCESS_EXPIRE").toString()
        });
        await this.userModel.updateOne({ _id: userItem._id }, { token });
        let item = {
          _id: userItem._id,
          phone: userItem.phone,
          email: userItem.email,
          dialing_code: userItem.dialing_code,
          fullname: userItem.fullname,
          locale: userItem.locale,
          token
        };
        return item;
      } else {
        throw new BadRequestException("Email or phone has not been registered");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  logout = async (id: string, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.checkAuthorized(req);
      if (isAuthenticated) {
        await this.userModel.updateOne(
          { _id: id },
          {
            token: null
          }
        );
        let item = await this.userModel.findById(id);
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  getUserByOldPassword = async (id: string, old_password: string, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.checkAuthorized(req);
      if (isAuthenticated) {
        let item = await this.userModel.findById(id);
        if (item) {
          const checkValidPassword = compareSync(old_password, item.password);
          if (checkValidPassword) {
            return item;
          } else {
            throw new BadRequestException("Old password does not match");
          }
        }
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  changePassword = async (id: string, new_password: string, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.checkAuthorized(req);
      if (isAuthenticated) {
        const newHashPassword = getHashPassword(new_password);
        await this.userModel.updateOne({ _id: id }, { password: newHashPassword });
        let item = await this.userModel.findById(id);
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };

  updateUserLocale = async (id: string, locale: string, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.checkAuthorized(req);
      if (isAuthenticated) {
        await this.userModel.updateOne({ _id: id }, { locale });
        let item = await this.userModel.findById(id);
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  resetPassword = async (email: string, new_password: string) => {
    try {
      const newHashPassword = getHashPassword(new_password);
      await this.userModel.updateOne({ email }, { password: newHashPassword });
      let item = await this.userModel.findOne({ email });
      return item;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  getUsersByEmail = async (email: string) => {
    try {
      let list = await this.userModel.find({ email });
      return list;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  listUsersByEmailAndId = async (id: string, email: string, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.checkAuthorized(req);
      if (isAuthenticated) {
        const list = await this.userModel.find({ email, _id: { $ne: id } });
        return list;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  listUsersByPhoneAndId = async (id: string, phone: string, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.checkAuthorized(req);
      if (isAuthenticated) {
        const list = await this.userModel.find({ phone, _id: { $ne: id } });
        return list;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  getUsersByPhone = async (phone: string) => {
    try {
      let list = await this.userModel.find({ phone });
      return list;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  sendEmailUser = async (email: string, otp: string) => {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "OTP from Gbooking",
        html: "<p>" + otp + "</p>"
      });
      let item = await this.userModel.findOne({ email });
      return item;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  sendEmailForPassword = async (email: string, password: string) => {
    try {
      this.mailerService.sendMail({
        to: email,
        subject: "Password from Gbooking",
        html: "<p>Password: " + password + "</p>"
      });
      let item = await this.userModel.findOne({ email });
      return item;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
}
