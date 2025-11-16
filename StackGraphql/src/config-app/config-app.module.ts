import { Module } from "@nestjs/common";
import { ConfigAppService } from "./config-app.service";
import { ConfigAppResolver } from "./config-app.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigApp, ConfigAppSchema } from "./config-app.schema";
import { UserModule } from "@/user/user.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: ConfigApp.name, schema: ConfigAppSchema }]), UserModule],
  providers: [ConfigAppResolver, ConfigAppService]
})
export class ConfigAppModule {}
