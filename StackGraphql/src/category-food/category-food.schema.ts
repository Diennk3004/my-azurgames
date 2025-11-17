import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

type CategoryFoodDocument = HydratedDocument<CategoryFood>;

@Schema({ collection: "category_food" })
class CategoryFood {
  @Prop()
  category_food_name_en: string;

  @Prop()
  category_food_name_vi: string;

  @Prop()
  category_food_slug: string;

  @Prop()
  category_food_image: string;

  @Prop()
  category_food_parent_id: string;
}

const CategoryFoodSchema = SchemaFactory.createForClass(CategoryFood);
export { CategoryFoodDocument, CategoryFood, CategoryFoodSchema };
