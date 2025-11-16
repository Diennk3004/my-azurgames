import { AppService } from "@/app.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { CategoryFoodModule } from "./category-food/category-food.module";
import { ConfigAppModule } from "./config-app/config-app.module";
import { FirebaseConfigModule } from "./firebase-config/firebase-config.module";
import { FoodModule } from "./food/food.module";
import { UserModule } from "./user/user.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (confService: ConfigService) => ({
        transport: {
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: confService.get<string>("MAIL_USER"),
            pass: confService.get<string>("MAIL_PASSWORD")
          }
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>'
        }
        /* preview: true,
        template: {
          dir: process.cwd() + "/templates/",
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        } */
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (confService: ConfigService) => ({
        uri: confService.get<string>("MONGODB_URI")
      }),
      inject: [ConfigService]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "src/public")
    }),
    UserModule,
    ConfigAppModule,
    FirebaseConfigModule,
    CategoryFoodModule,
    FoodModule
  ],
  providers: [AppService]
})
export class AppModule {}
