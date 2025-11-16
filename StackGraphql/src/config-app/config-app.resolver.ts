import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ConfigAppService } from "./config-app.service";
import { ConfigAppType } from "./config-app.type";
import { CreateConfigAppInput, UpdateConfigAppInput } from "./config-app.input";
import { Request } from "express";
@Resolver(() => ConfigAppType)
export class ConfigAppResolver {
  constructor(private readonly configAppService: ConfigAppService) {}
  @Mutation(() => ConfigAppType)
  createConfigApp(@Args("createConfigAppInput") createConfigAppInput: CreateConfigAppInput, @Context("req") req: Request) {
    return this.configAppService.create(createConfigAppInput, req);
  }

  @Mutation(() => ConfigAppType)
  updateConfigApp(@Args("updateConfigAppInput") updateConfigAppInput: UpdateConfigAppInput, @Context("req") req: Request) {
    return this.configAppService.update(updateConfigAppInput, req);
  }

  @Query(() => [ConfigAppType])
  loadConfigApp(@Context("req") req: Request) {
    return this.configAppService.loadConfigApp(req);
  }
}
