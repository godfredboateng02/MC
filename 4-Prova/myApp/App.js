import { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { locationPermissionAsync } from './viewmodel/Location';

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