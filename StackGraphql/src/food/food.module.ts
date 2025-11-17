import { Module } from "@nestjs/common";
import { FoodService } from "./food.service";
import { FoodResolver } from "./food.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Food, FoodSchema } from "./food.schema";
import { UserModule } from "@/user/user.module";
import { CategoryFoodModule } from "@/category-food/category-food.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]), UserModule, CategoryFoodModule],
  providers: [FoodResolver, FoodService]
})
export class FoodModule {}
