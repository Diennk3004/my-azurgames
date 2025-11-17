import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
class CreateCategoryFoodInput {
  @Field(() => String, { nullable: true })
  category_food_name_en: string;

  @Field(() => String, { nullable: true })
  category_food_name_vi: string;

  @Field(() => String, { nullable: true })
  category_food_slug: string;

  @Field(() => String, { nullable: true })
  category_food_image: string;

  @Field(() => String, { nullable: true })
  category_food_parent_id: string;
}

export { CreateCategoryFoodInput };
