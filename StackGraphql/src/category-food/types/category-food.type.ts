import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
class CategoryFoodType {
  @Field((type) => String)
  _id: string;

  @Field(() => String, { nullable: true })
  category_food_name_en: string;

  @Field(() => String, { nullable: true })
  category_food_name_vi: string;

  @Field(() => String, { nullable: true })
  category_food_image: string;

  @Field(() => String, { nullable: true })
  category_food_parent_id: string;
}
export { CategoryFoodType };
