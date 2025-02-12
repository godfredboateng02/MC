import * as Location from 'expo-location';

export default class location {

    lat = null;
    lng = null;

  static async requestPermissions() {
    try {
      const grantedPermission = await Location.getForegroundPermissionsAsync();
      if (grantedPermission.status === "granted") {
        return true;
      }
      const permissionResponse = await Location.requestForegroundPermissionsAsync();
      return permissionResponse.status === "granted";
    } catch (error) {
      console.error("Errore durante la richiesta dei permessi:", error);
      return false;
    }
  }

  static async getCurrentPosition() {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.warn("Permessi non concessi per accedere alla posizione.");
        return null;
      }

      const location = await Location.getCurrentPositionAsync();
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error("Errore durante l'acquisizione della posizione:", error);
      return null;
    }
  }

  static async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  static async reset() {
    await this.sleep(60000);
    this.lat = null;
    this.lng = null;
  }

  static async updateLocation() {
    let position = await this.getCurrentPosition();
    this.lat = position.latitude;
    this.lng = position.longitude;
    this.reset();
  }


  static async getLat(RN = false) {
    if (this.lat == null || RN == true) {
      await this.updateLocation();
    }
    console.log("getLat",this.lat)
    return this.lat;
  }

  static async getLng(RN = false) {
    if (this.lat == null || RN == true) {
        await this.updateLocation();
    }
    console.log("getLng",this.lng)
    return this.lng;
  }
}