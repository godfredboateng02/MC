import * as Location from 'expo-location';

export async function locationPermissionAsync(setLat, setLng) {
    let canUseLocation = false;
    console.log("locationPermissionAsync");
    // controlla se l'utente ha già dato i permessi
    const grantedPermission = await Location.getForegroundPermissionsAsync();
    console.log("grantedPermission:", grantedPermission);
    if (grantedPermission.granted) {
        canUseLocation = true;
    } else {
        const permissionResponse = await Location.requestForegroundPermissionsAsync();
        console.log("permissionResponse:", permissionResponse);
        if (permissionResponse.granted) {
            canUseLocation = true;
        }
    }

    if (canUseLocation) {
        const location = await Location.getCurrentPositionAsync();
        console.log("received location:", location);
        setLat(location.coords.latitude);
        setLng(location.coords.longitude);
    }
}