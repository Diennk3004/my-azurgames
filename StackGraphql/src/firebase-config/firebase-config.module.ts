import { Module } from "@nestjs/common";
import { FirebaseConfigService } from "./firebase-config.service";

@Module({
  providers: [FirebaseConfigService],
  exports: [FirebaseConfigService]
})
export class FirebaseConfigModule {}
