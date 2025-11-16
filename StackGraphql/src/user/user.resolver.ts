import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "express";
import { CreateUserInput, UpdateUserInput } from "./user.input";
import { UserType } from "./user.type";
import { UserService } from "./user.service";

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => UserType)
  updateAccount(@Args("updateUserInput") updateUserInput: UpdateUserInput, @Context("req") req: Request) {
    return this.userService.update(updateUserInput, req);
  }

  @Mutation(() => UserType)
  login(@Args("email_phone", { type: () => String }) email_phone: string, @Args("password", { type: () => String }) password: string) {
    return this.userService.login(email_phone, password);
  }

  @Mutation(() => UserType)
  loginByEmail(@Args("email", { type: () => String }) email: string) {
    return this.userService.loginByEmail(email);
  }

  @Query(() => UserType)
  account(@Context("req") req: Request) {
    return this.userService.getAccount(req);
  }

  @Mutation(() => UserType)
  logout(@Args("id", { type: () => String }) id: string, @Context("req") req: Request) {
    return this.userService.logout(id, req);
  }

  @Mutation(() => UserType)
  checkValidToken(@Args("token", { type: () => String }) token: string) {
    return this.userService.checkValidToken(token);
  }

  @Mutation(() => UserType)
  getUserByOldPassword(@Args("id", { type: () => String }) id: string, @Args("old_password", { type: () => String }) old_password: string, @Context("req") req: Request) {
    return this.userService.getUserByOldPassword(id, old_password, req);
  }

  @Mutation(() => UserType)
  changePassword(@Args("id", { type: () => String }) id: string, @Args("new_password", { type: () => String }) new_password: string, @Context("req") req: Request) {
    return this.userService.changePassword(id, new_password, req);
  }

  @Mutation(() => UserType)
  resetPassword(@Args("email", { type: () => String }) email: string, @Args("new_password", { type: () => String }) new_password: string) {
    return this.userService.resetPassword(email, new_password);
  }

  @Query(() => [UserType])
  getUsersByEmail(@Args("email", { type: () => String }) email: string) {
    return this.userService.getUsersByEmail(email);
  }

  @Query(() => [UserType])
  getUsersByPhone(@Args("phone", { type: () => String }) phone: string) {
    return this.userService.getUsersByPhone(phone);
  }

  @Mutation(() => [UserType])
  listUsersByEmailAndId(@Args("id", { type: () => String }) id: string, @Args("email", { type: () => String }) email: string, @Context("req") req: Request) {
    return this.userService.listUsersByEmailAndId(id, email, req);
  }

  @Mutation(() => [UserType])
  listUsersByPhoneAndId(@Args("id", { type: () => String }) id: string, @Args("phone", { type: () => String }) phone: string, @Context("req") req: Request) {
    return this.userService.listUsersByPhoneAndId(id, phone, req);
  }

  @Mutation(() => UserType, { nullable: true })
  sendEmailUser(@Args("email", { type: () => String }) email: string, @Args("otp", { type: () => String }) otp: string) {
    return this.userService.sendEmailUser(email, otp);
  }

  @Mutation(() => UserType)
  sendEmailForPassword(@Args("email", { type: () => String }) email: string, @Args("password", { type: () => String }) password: string) {
    return this.userService.sendEmailForPassword(email, password);
  }

  @Mutation(() => UserType)
  updateUserLocale(@Args("id", { type: () => String }) id: string, @Args("locale", { type: () => String }) locale: string, @Context("req") req: Request) {
    return this.userService.updateUserLocale(id, locale, req);
  }

  @Query(() => UserType)
  getCookie(@Context("req") req: Request) {
    const user = req.cookies["user_register"];
    return { status: true, message: user, item: null, list: [] };
  }
}
