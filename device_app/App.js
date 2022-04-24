import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Camera} from 'expo-camera';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [detectedPerson, setDetectedPerson] = useState('');
  fetch('/train')
  useEffect(() => {
    fetch('/test').then(res => res.json()).then(json => {
      setDetectedPerson(json.detect);
    });
  }, []);
  //use detectedPerson as output of test
  
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

    })();
  }, []);

  const takePicture = async () => {
    if (camera){
      const data=await camera.takePictureAsync(null)
      setImage(data.uri);
    }
  }

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{flex:1}}>
      <Home/>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)}
        style={styles.fixedRatio}
        type={type}
        ratio={'1:1'}   
        />
      </View>
      <Button
        title='Flip camera'
        onPress={()=>{
          setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);

        }}></Button>
      <Button
        title='Take Picture'
        onPress={()=>takePicture()}
      />
      {image && <Image source={{uri: image}} style={{flex:1}}/>}

    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio:{
    flex:1,
    aspectRatio:1
  }
});
