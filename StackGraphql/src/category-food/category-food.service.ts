import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CategoryFood } from "./category-food.schema";
import { Model } from "mongoose";
import { UserService } from "@/user/user.service";
import { CreateCategoryFoodInput, UpdateCategoryFoodInput } from "./dto";
import { Request } from "express";
import { CategoryFoodType } from "./types";
@Injectable()
export class CategoryFoodService {
  constructor(
    @InjectModel(CategoryFood.name) private categoryFoodModel: Model<CategoryFood>,
    private userService: UserService
  ) {}
  create = async (createCategoryFoodInput: CreateCategoryFoodInput, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        const created = new this.categoryFoodModel(createCategoryFoodInput);
        let item = await created.save();
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  update = async (updateCategoryFoodInput: UpdateCategoryFoodInput, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        if (updateCategoryFoodInput.category_food_name_en) {
          await this.categoryFoodModel.updateOne({ _id: updateCategoryFoodInput.id }, { category_food_name_en: updateCategoryFoodInput.category_food_name_en.trim() });
        }
        if (updateCategoryFoodInput.category_food_name_vi) {
          await this.categoryFoodModel.updateOne({ _id: updateCategoryFoodInput.id }, { category_food_name_vi: updateCategoryFoodInput.category_food_name_vi.trim() });
        }
        if (updateCategoryFoodInput.category_food_slug) {
          await this.categoryFoodModel.updateOne({ _id: updateCategoryFoodInput.id }, { category_food_slug: updateCategoryFoodInput.category_food_slug.trim() });
        }
        if (updateCategoryFoodInput.category_food_image) {
          await this.categoryFoodModel.updateOne({ _id: updateCategoryFoodInput.id }, { category_food_image: updateCategoryFoodInput.category_food_image });
        }
        if (updateCategoryFoodInput.category_food_parent_id) {
          await this.categoryFoodModel.updateOne({ _id: updateCategoryFoodInput.id }, { category_food_parent_id: updateCategoryFoodInput.category_food_parent_id });
        }
        const item = await this.categoryFoodModel.findById(updateCategoryFoodInput.id);
        return item;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  delete = async (id: string, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        await this.categoryFoodModel.deleteOne({ _id: id });
        let list = await this.categoryFoodModel.find({});
        return list;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  getMenu = async () => {
    try {
      let items = await this.categoryFoodModel.find({ category_food_parent_id: null });
      return items;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  getTag = async (menu: string) => {
    try {
      let menuParent: CategoryFoodType = await this.categoryFoodModel.findOne({ category_food_slug: menu });
      let items = await this.categoryFoodModel.find({ category_food_parent_id: menuParent._id });
      return items;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
}
