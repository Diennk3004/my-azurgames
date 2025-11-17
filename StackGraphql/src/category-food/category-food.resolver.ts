import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryFoodService } from "./category-food.service";
import { CreateCategoryFoodInput, UpdateCategoryFoodInput } from "./dto";
import { Request } from "express";
import { CategoryFoodType } from "./types";

@Resolver(() => CategoryFoodType)
export class CategoryFoodResolver {
  constructor(private readonly categoryFoodService: CategoryFoodService) {}
  @Mutation(() => CategoryFoodType)
  createMenuFood(@Args("createCategoryFoodInput") createCategoryFoodInput: CreateCategoryFoodInput, @Context("req") req: Request) {
    return this.categoryFoodService.create(createCategoryFoodInput, req);
  }

  @Mutation(() => CategoryFoodType)
  updateMenuFood(@Args("updateCategoryFoodInput") updateCategoryFoodInput: UpdateCategoryFoodInput, @Context("req") req: Request) {
    return this.categoryFoodService.update(updateCategoryFoodInput, req);
  }

  @Query(() => [CategoryFoodType])
  menuList() {
    return this.categoryFoodService.getMenu();
  }

  @Query(() => [CategoryFoodType])
  tagList(@Args("menu") menu: string) {
    return this.categoryFoodService.getTag(menu);
  }

  @Mutation(() => [CategoryFoodType])
  deleteCategoryFood(@Args("id", { type: () => String }) id: string, @Context("req") req: Request) {
    return this.categoryFoodService.delete(id, req);
  }
}
