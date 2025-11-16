import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class ConfigAppType {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  alias: string;

  @Field(() => String, { nullable: true })
  news_screen_category_alias: string;

  @Field(() => String, { nullable: true })
  home_screen_club_name: string;

  @Field(() => String, { nullable: true })
  featured_event: string;

  @Field(() => String, { nullable: true })
  club_near_by: string;

  @Field(() => String, { nullable: true })
  top_rate_club: string;

  @Field(() => String, { nullable: true })
  term_policy_en: string;

  @Field(() => String, { nullable: true })
  term_policy_vi: string;

  @Field(() => String, { nullable: true })
  support_center_en: string;

  @Field(() => String, { nullable: true })
  support_center_vi: string;
}
export { ConfigAppType };
