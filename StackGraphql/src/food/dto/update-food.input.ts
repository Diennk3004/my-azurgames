import { Field, Float, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateFoodInput } from "./create-food.input";

@InputType()
class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field(() => String)
  id: string;
}

export { UpdateFoodInput };
