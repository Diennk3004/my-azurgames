import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryFoodService } from "./category-food.service";
import { CreateCategoryFoodInput, UpdateCategoryFoodInput } from "./dto";
import { Request } from "express";
import { CategoryFoodType } from "./types";

@Resolver(() => CategoryFoodType)
export class CategoryFoodResolver {
  constructor(private readonly categoryFoodService: CategoryFoodService) {}
  @Mutation(() => CategoryFoodType)
  createCategoryFood(@Args("createCategoryFoodInput") createCategoryFoodInput: CreateCategoryFoodInput, @Context("req") req: Request) {
    return this.categoryFoodService.create(createCategoryFoodInput, req);
  }

  @Mutation(() => CategoryFoodType)
  updateCategoryFood(@Args("createCategoryFoodInput") updateCategoryFoodInput: UpdateCategoryFoodInput, @Context("req") req: Request) {
    return this.categoryFoodService.update(updateCategoryFoodInput, req);
  }

  @Query(() => [CategoryFoodType])
  getCategoryFoodList(@Context("req") req: Request) {
    return this.categoryFoodService.getList(req);
  }

  @Mutation(() => [CategoryFoodType])
  deleteCategoryFood(@Args("id", { type: () => String }) id: string, @Context("req") req: Request) {
    return this.categoryFoodService.delete(id, req);
  }
}
