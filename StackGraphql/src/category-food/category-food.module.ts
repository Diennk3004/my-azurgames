import { Module } from "@nestjs/common";
import { CategoryFoodService } from "./category-food.service";
import { CategoryFoodResolver } from "./category-food.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "@/user/user.module";
import { CategoryFood, CategoryFoodSchema } from "./category-food.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: CategoryFood.name, schema: CategoryFoodSchema }]), UserModule],
  providers: [CategoryFoodResolver, CategoryFoodService]
})
export class CategoryFoodModule {}
