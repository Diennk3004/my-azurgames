import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

type UserDocument = HydratedDocument<User>;

@Schema({ collection: "user" })
class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullname: string;

  @Prop()
  dialing_code: string;

  @Prop()
  phone: string;

  @Prop()
  locale: string;

  @Prop()
  token: string;
}

const UserSchema = SchemaFactory.createForClass(User);
export { UserDocument, User, UserSchema };
