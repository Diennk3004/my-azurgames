import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigApp } from "./config-app.schema";
import { Model } from "mongoose";
import { UserService } from "@/user/user.service";
import { CreateConfigAppInput, UpdateConfigAppInput } from "./config-app.input";
import { Request } from "express";
@Injectable()
export class ConfigAppService {
  constructor(
    @InjectModel(ConfigApp.name) private configAppModel: Model<ConfigApp>,
    private userService: UserService
  ) {}
  create = async (createConfigAppInput: CreateConfigAppInput, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        const created = new this.configAppModel(createConfigAppInput);
        let item = await created.save();
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  update = async (updateConfigAppInput: UpdateConfigAppInput, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        if (updateConfigAppInput.news_screen_category_alias) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { news_screen_category_alias: updateConfigAppInput.news_screen_category_alias.toString().trim() });
        }
        if (updateConfigAppInput.home_screen_club_name) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { home_screen_club_name: updateConfigAppInput.home_screen_club_name.toString().trim() });
        }
        if (updateConfigAppInput.featured_event) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { featured_event: updateConfigAppInput.featured_event.toString().trim() });
        }
        if (updateConfigAppInput.club_near_by) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { club_near_by: updateConfigAppInput.club_near_by.toString().trim() });
        }
        if (updateConfigAppInput.top_rate_club) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { top_rate_club: updateConfigAppInput.top_rate_club.toString().trim() });
        }
        if (updateConfigAppInput.term_policy_en) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { term_policy_en: updateConfigAppInput.term_policy_en.toString().trim() });
        }
        if (updateConfigAppInput.term_policy_vi) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { term_policy_vi: updateConfigAppInput.term_policy_vi.toString().trim() });
        }
        if (updateConfigAppInput.support_center_en) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { support_center_en: updateConfigAppInput.support_center_en.toString().trim() });
        }
        if (updateConfigAppInput.support_center_vi) {
          await this.configAppModel.updateOne({ _id: updateConfigAppInput.id }, { support_center_vi: updateConfigAppInput.support_center_vi.toString().trim() });
        }
        let item = await this.configAppModel.findById(updateConfigAppInput.id);
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  loadConfigApp = async (req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        let list = await this.configAppModel.find({});
        return list;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
}
