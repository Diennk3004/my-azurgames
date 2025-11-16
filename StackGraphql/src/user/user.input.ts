import { Field, InputType } from "@nestjs/graphql";

@InputType()
class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  fullname: string;

  @Field(() => String)
  dialing_code: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  locale: string;
}
@InputType()
class UpdateUserInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  fullname: string;

  @Field(() => String, { nullable: true })
  dialing_code: string;

  @Field(() => String, { nullable: true })
  phone: string;
}
export { CreateUserInput, UpdateUserInput };
