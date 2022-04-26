import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {RNCamera} from 'react-native-camera';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

var flag = false;     // flag == true -> dừng nhận dạng

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ratioWidth = Dimensions.get('window').width / 1080;
const ratioHeight = Dimensions.get('window').height / 1920;
//const fs = require('fs')
//const folderName = 'Users/dataset/test'

let a = 0;

const fetchData = async(link)=>{
  const resp = await fetch(link)
};

const App = () => {
  /*useEffect(() => {
    fetch('/train');
  }, []);
*/
  const [data, setData] = useState([])

  const [currentTime, setCurrentTime] = useState(0);

  const [type, setType] = useState(RNCamera.Constants.Type.front);
  const [box, setBox] = useState(null);
  const cameraRef = useRef(null);
  
  const [image, setImage] = useState(null);

  const [detectedPerson, setDetectedPerson] = useState('');
  //fetch('/open');
  
  var i = 0;

  async function takePicture(mode){
    
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true};      
        const data = await cameraRef.current.takePictureAsync(options);            
        console.log("picture source", data.uri);  
        setImage(data.uri);
        a = data.uri;
        console.log(a);
        
        let formdata = new FormData();
        fname = 'image' +(i++).toString() + '.jpg';
        formdata.append("file", {uri: data.uri, name: fname, type: 'image/jpeg'});
          const fetchData = async()=>{
            var fetchlink = '';
            if (mode == 'recognize'){
              fetchlink = 'http://192.168.42.127:8081/recognize';
            }
            else {fetchlink = 'http://192.168.42.127:8081/add';};
            const resp = await fetch(fetchlink,{
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formdata
            }).then(response => {
              console.log("image uploaded")
            }).catch(err => {
              console.log(err)
            })
            };
            fetchData();
    }
  };
  

  const handlerFace = ({faces}) => {
    if (flag) return;
    if (faces[0]) {
      flag = true;
      setBox({
        boxs: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle,
        },
        rightEyePosition: faces[0].rightEyePosition,
        leftEyePosition: faces[0].leftEyePosition,
        bottomMounthPosition: faces[0].bottomMounthPosition,
      });
        fetchData('http://192.168.42.127:8081/recfolder');
        var timeID = setInterval(() => {
          takePicture('recognize')
        }, 1000);
        setTimeout(() => {
          clearInterval(timeID);          
        }, 5000);
        setTimeout(()=>{
          fetchData('http://192.168.42.127:8081/test');
        }, 5001);
        setTimeout(()=>{flag = false;}, 10000)
        

    } else {      
      setBox(null);
    }
  };

  const Recognition = () => {
    return (    
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          captureAudio={false}
          onFacesDetected={handlerFace}
          faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        />
        {box && (
            <View
              style={styles.bound({
                width: box.boxs.width,
                height: box.boxs.height,
                x: box.boxs.x,
                y: box.boxs.y,
              })}
            />
        )}
      </View>
    )
  };


  const Add = () =>{

    return (    
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          captureAudio={false}
        />
        <TouchableOpacity
            onPress={
              () => {
                fetchData('http://192.168.42.127:8081/addfolder');
                var timeID = setInterval(() => {
                takePicture('add')
              }, 1000);
              setTimeout(() => {
                clearInterval(timeID)
              }, 10000);
              }
            }
            style={styles.addButton}>
          <Text> Snap </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={
              () => {
                fetchData('http://192.168.42.127:8081/train')
              }
            }
            style={styles.addButton2}>
          <Text> Train </Text>
        </TouchableOpacity>
      </View>
    )
  };  
  const Tab = createBottomTabNavigator();
  

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Add" component = {Add}/>
        <Tab.Screen name="Recognition" component = {Recognition}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  camera: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    width: 150*ratioWidth,
    height: 150*ratioWidth,
    left: 100*ratioWidth,
    bottom: 150*ratioHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  addButton2: {
    position: 'absolute',
    width: 150*ratioWidth,
    height: 150*ratioWidth,
    left: 830*ratioWidth,
    bottom: 150*ratioHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  bound: ({width, height, x, y}) => {
    return {
      position: 'absolute',
      top: y,
      left: x - 50,
      height,
      width,
      borderWidth: 5,
      borderColor: 'red',
      zIndex: 3000,
    };
  },
  
});

export default App;
