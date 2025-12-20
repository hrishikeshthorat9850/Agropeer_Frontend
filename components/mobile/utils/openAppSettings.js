import { Capacitor } from "@capacitor/core";
import { NativeSettings,AndroidSettings } from "capacitor-native-settings";

export const openAppSettings = async () => {
  if (Capacitor.isNativePlatform()) {
    try{
      await NativeSettings.openAndroid({
        option : AndroidSettings.Location,
      });
    }catch(e){
      console.error("Error opening App settings :",e);
    }
  }else{
    alert("This feature is only available on a Android")
  }
}
