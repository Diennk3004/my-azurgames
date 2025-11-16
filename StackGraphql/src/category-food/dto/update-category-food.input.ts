import { Field, Float, InputType, PartialType } from "@nestjs/graphql";
import { CreateCategoryFoodInput } from "./create-category-food.input";

@InputType()
class UpdateCategoryFoodInput extends PartialType(CreateCategoryFoodInput) {
  @Field(() => String)
  id: string;
}

export { UpdateCategoryFoodInput };
