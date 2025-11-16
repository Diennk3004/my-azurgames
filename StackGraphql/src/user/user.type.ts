import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
class UserType {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  fullname: string;

  @Field((type) => String)
  dialing_code: string;

  @Field((type) => String)
  phone: string;

  @Field((type) => String, { nullable: true })
  locale: string;

  @Field((type) => String, { nullable: true })
  token: string;
}
export { UserType };
