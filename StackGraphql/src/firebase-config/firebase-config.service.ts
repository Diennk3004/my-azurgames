import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FirebaseConfigService {
  constructor(private confService: ConfigService) {}
  loadFirebaseConfig = () => {
    try {
      const firebaseConfig = {
        apiKey: this.confService.get<string>("FIREBASE_API_KEY").toString().trim(),
        authDomain: this.confService.get<string>("FIREBASE_AUTH_DOMAIN").toString().trim(),
        databaseURL: this.confService.get<string>("FIREBASE_DATABASE_URL").toString().trim(),
        projectId: this.confService.get<string>("FIREBASE_PROJECT_ID").toString().trim(),
        storageBucket: this.confService.get<string>("FIREBASE_STORAGE_BUCKET").toString().trim(),
        messagingSenderId: this.confService.get<string>("FIREBASE_MESSAGINGSENDER_ID").toString().trim(),
        appId: this.confService.get<string>("FIREBASE_APP_ID").toString().trim()
      };
      return firebaseConfig;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  };
}
