import { createNavigationContainerRef } from "@react-navigation/native";
import Storage from "./model/storage";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
    Storage.setPagina(name);
    Storage.setParametri(params);
  }
}