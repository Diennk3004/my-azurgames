import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

type ConfigAppDocument = HydratedDocument<ConfigApp>;

@Schema({ collection: "config_app" })
class ConfigApp {
  @Prop()
  alias: string;

  @Prop()
  news_screen_category_alias: string;

  @Prop()
  home_screen_club_name: string;

  @Prop()
  featured_event: string;

  @Prop()
  club_near_by: string;

  @Prop()
  top_rate_club: string;

  @Prop()
  term_policy_en: string;

  @Prop()
  term_policy_vi: string;

  @Prop()
  support_center_en: string;

  @Prop()
  support_center_vi: string;
}

const ConfigAppSchema = SchemaFactory.createForClass(ConfigApp);
export { ConfigAppDocument, ConfigApp, ConfigAppSchema };
