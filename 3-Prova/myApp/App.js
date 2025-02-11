import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import * as Location from 'expo-location'
//import LocationComponent from './viewmodel/LocationViewModel';

export default function App(){

  const [loc,setLoc] = useState("")
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()

  async function locationPermissionAsync(){
      let canUseLocation = "false";
      console.log("locationPermissionAsync")
      //controlla se utenti hanno già dato i permessi
      const grantedPermission = await Location.getForegroundPermissionsAsync()
      console.log("grantedPermission:",grantedPermission)
      if (grantedPermission.granted){
          canUseLocation = "true"
      }else{
          const permissionResponse = await Location.requestForegroundPermissionsAsync()
          console.log("permissionResponse:",permissionResponse)
          if (permissionResponse.granted){
              canUseLocation = true
          }
      }   
  
      if (canUseLocation){
          const location = await Location.getCurrentPositionAsync()
          console.log("received location:",location);
          //this.state.location = location.coords.latitude + " - " + location.coords.longitude
          setLat(location.coords.latitude)
          setLng(location.coords.longitude)
      }
  }  

  return(
    <View style={styles.container}>
      {lat &&  lng ? <Text>{lat} e {lng}</Text> : null }
      <Button title="get location" onPress={()=>locationPermissionAsync()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


/*
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
 */

/*
import { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { locationPermissionAsync } from './viewmodel/LocationViewModel';

export default function App() {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  return (
    <View style={styles.container}>
      {lat && lng ? <Text>{lat} e {lng}</Text> : null}
      <Button title="get location" onPress={() => locationPermissionAsync(setLat, setLng)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
*/
