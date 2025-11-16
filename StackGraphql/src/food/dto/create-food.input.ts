import { Field, Float, InputType, Int } from "@nestjs/graphql";

@InputType()
class CreateFoodInput {
  @Field(() => String, { nullable: true })
  food_name_en: string;

  @Field(() => String, { nullable: true })
  food_name_vi: string;

  @Field(() => String, { nullable: true })
  featured_image: string;

  @Field(() => String, { nullable: true })
  category_food_id: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field(() => Int, { nullable: true })
  size: number;
}

export { CreateFoodInput };
