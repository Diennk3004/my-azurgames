import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { FoodService } from "./food.service";
import { FoodType } from "./types";
import { CreateFoodInput, UpdateFoodInput } from "./dto";
import { Request } from "express";
@Resolver(() => FoodType)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}
  @Mutation(() => FoodType)
  createFood(@Args("createFoodInput") createFoodInput: CreateFoodInput, @Context("req") req: Request) {
    return this.foodService.create(createFoodInput, req);
  }

  @Mutation(() => FoodType)
  updateFood(@Args("updateFoodInput") updateFoodInput: UpdateFoodInput, @Context("req") req: Request) {
    return this.foodService.update(updateFoodInput, req);
  }

  @Mutation(() => [FoodType])
  deleteFood(@Args("id", { type: () => String }) id: string, @Context("req") req: Request) {
    return this.foodService.delete(id, req);
  }

  @Query(() => [FoodType])
  foodList(
    @Args("category_food_id", { type: () => String, nullable: true }) category_food_id: string,
    @Args("perpage", { type: () => Int }) perpage: number,
    @Args("keyword", { type: () => String, nullable: true }) keyword: string,
    @Context("req") req: Request
  ) {
    return this.foodService.getList(category_food_id, perpage, keyword, req);
  }
}
