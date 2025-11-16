import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

type FoodDocument = HydratedDocument<Food>;

@Schema({ collection: "food" })
class Food {
  @Prop()
  food_name_en: string;

  @Prop()
  food_name_vi: string;

  @Prop()
  featured_image: string;

  @Prop()
  category_food_id: string;

  @Prop()
  price: number;

  @Prop()
  size: number;
}

const FoodSchema = SchemaFactory.createForClass(Food);
export { FoodDocument, Food, FoodSchema };
