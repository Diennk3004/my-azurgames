import { UserService } from "@/user/user.service";
import { convertToAlias } from "@/utils";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request } from "express";
import { Model } from "mongoose";
import { Food } from "./food.schema";
import { CreateFoodInput, UpdateFoodInput } from "./dto";

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    private userService: UserService
  ) {}
  create = async (createFoodInput: CreateFoodInput, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        let foodList = await this.foodModel.find({
          $or: [{ food_name_en: createFoodInput.food_name_en }, { food_name_vi: createFoodInput.food_name_vi }]
        });
        if (foodList && foodList.length > 0) {
          throw new BadRequestException("Food is duplicated");
        } else {
          const created = new this.foodModel(createFoodInput);
          let item = await created.save();
          return item;
        }
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  update = async (updateFoodInput: UpdateFoodInput, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        let categoryFoodList = await this.foodModel.find({
          $or: [{ food_name_en: updateFoodInput.food_name_en }, { food_name_vi: updateFoodInput.food_name_vi }],
          _id: { $ne: updateFoodInput.id }
        });
        if (categoryFoodList && categoryFoodList.length > 0) {
          throw new BadRequestException("Food is duplicated");
        } else {
          if (updateFoodInput.food_name_en) {
            await this.foodModel.updateOne({ _id: updateFoodInput.id }, { food_name_en: updateFoodInput.food_name_en.trim() });
          }
          if (updateFoodInput.food_name_vi) {
            await this.foodModel.updateOne({ _id: updateFoodInput.id }, { food_name_vi: updateFoodInput.food_name_vi.trim() });
          }
          if (updateFoodInput.featured_image) {
            await this.foodModel.updateOne({ _id: updateFoodInput.id }, { featured_image: updateFoodInput.featured_image });
          }
          if (updateFoodInput.category_food_id) {
            await this.foodModel.updateOne({ _id: updateFoodInput.id }, { category_food_id: updateFoodInput.category_food_id });
          }
          if (updateFoodInput.price) {
            await this.foodModel.updateOne({ _id: updateFoodInput.id }, { price: updateFoodInput.price });
          }
          if (updateFoodInput.size) {
            await this.foodModel.updateOne({ _id: updateFoodInput.id }, { size: updateFoodInput.size });
          }
          const item = await this.foodModel.findById(updateFoodInput.id);
          return item;
        }
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
        await this.foodModel.deleteOne({ _id: id });
        let list = await this.foodModel.find({});
        return list;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
  getList = async (category_sport_id: string, perpage: number, keyword: string, req: Request) => {
    try {
      const isAuthenticated: boolean = await this.userService.checkAuthorized(req);
      if (isAuthenticated) {
        let where = {};
        if (category_sport_id) {
          where["category_sport_id"] = category_sport_id;
        }
        if (keyword) {
          let where1 = { ground_name: new RegExp(keyword, "i") };
          let where2 = { "ground_branch.address": new RegExp(keyword, "i") };
          where["$or"] = [where1, where2];
        }
        let list = await this.foodModel.aggregate([
          {
            $addFields: { id_category_food: { $toString: "$_id" } }
          },
          {
            $lookup: {
              from: "category_food",
              localField: "category_food_id",
              foreignField: "id_category_food",
              as: "food_category"
            }
          },
          {
            $match: where
          }
        ]);
        return list;
      } else {
        throw new BadRequestException("NOT_AUTHENTICATED");
      }
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
}
