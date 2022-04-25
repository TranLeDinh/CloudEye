import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ImageBackground, View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { Avatar } from 'react-native-elements';
import { faHouse, faChartColumn, faBell, faCamera, faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {Camera, Report} from './Home';


import {COLORS, FONTS, ratioHeight, ratioWidth} from '../constants';

const HomeScreen = ({route, navigation}) => {
	const open = async() => {
    let response = await fetch('https://io.adafruit.com/api/v2/luongduy2001/feeds/bbc-pump/data', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-aio-key': "",
      },
      body: JSON.stringify({"feed_id": 1900491,"value": "2"}),
    });
  }
  const buttonClickedHandler = () => {
    open();
  };
  return (
        <View style = {stylesheet.container}>
          <ImageBackground source = {require('../assets/logo.png')} resizeMode ="contain" style={stylesheet.bg} blurRadius ={2}>
          </ImageBackground>
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={stylesheet.roundButton}>
            <Text style = {stylesheet.buttonTextStyle}>MỞ</Text>
            <Text style = {stylesheet.buttonTextStyle}>CỬA</Text>
          </TouchableOpacity>
        </View>
	)
}

const Settings = ({route, navigation}) => {
  const buttonClickedHandler = () => {
    // do something
  };
  return (
        <View style = {stylesheet.container}>
          <Avatar rounded icon={{name: 'user', type: 'font-awesome'}} style ={{left : 30}}/>
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={stylesheet.addButton}>
            <FontAwesomeIcon icon={faPlus} size={100*ratioWidth} color='white' />
          </TouchableOpacity>
        </View>
	)
}

class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"Johnny Watson", text:"Johnny Watson đã ghé thăm bạn vào 15:30", date:"Hôm nay"},
        {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"!!! Phát hiện người lạ !!!", text:"Phát hiện người lạ vào lúc 9:41", date:"29/03/2022"},
      ]
    }
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          let mainContentStyle;
          return(
            <View style={styles.container}>
              <Image source={{uri:Notification.image}} style={styles.avatar}/>
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <Text style={styles.name}>{Notification.name}</Text>
                  <Text style={styles.text}>{Notification.text}</Text>
                  <Text style={styles.date}>{Notification.date}</Text>
                </View>
              </View>
            </View>
          );
        }}/>
    );
  }
}

const Noti = ({route, navigation}) => {
  return (
        <View style = {stylesheet.container}>
          <Notifications/>
        </View>
	)
}

const Tab = createBottomTabNavigator();

const Tabs = ({route, navigation}) => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === 'CLOUDEYE') {
              icon =faHouse;
            } else if (route.name === 'Camera') {
              icon =faCamera ;
            } else if (route.name === 'Báo cáo') {
              icon =faChartColumn ;
            } else if (route.name === 'Thông báo') {
              icon =faBell ;
            } else {
              icon =faGear ;
            }
            return <FontAwesomeIcon icon={icon} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.lightgreen,
          tabBarInactiveTintColor: COLORS.grey,
        })}
        tabBarOptions={{
          labelStyle: FONTS.h4,
        }}
        >
        <Tab.Screen name="CLOUDEYE" component = {HomeScreen} options ={{tabBarLabel: 'Trang chủ'}}/>
        <Tab.Screen name="Camera" component = {Camera}/>
        <Tab.Screen name="Báo cáo" component = {Report}/>
        <Tab.Screen name="Thông báo" component = {Noti}/>
        <Tab.Screen name="Cài đặt" component = {Settings}/>
      </Tab.Navigator>
  );
};

const stylesheet = StyleSheet.create({
	container: {
    flex: 1,
    paddingTop: 20,
	},
  bg: {
    flex: 1,
    alignContent: "center",
    opacity: 0.5,
    margin: 150*ratioWidth,
    bottom: 200*ratioWidth,
  },
  roundButton:{
    position: 'absolute',
    width: 375*ratioWidth,
    height: 375*ratioWidth,
    left: 705*ratioWidth/2,
    bottom: 150*ratioHeight,
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 0
    },
    borderRadius: 100,
    backgroundColor: COLORS.red,
  },
  buttonTextStyle:{
    fontFamily: 'Roboto-Bold',
    fontSize: 100 * ratioWidth,
    color : 'white',
    textAlign: 'center'
  },
  addButton:{
    position: 'absolute',
    width: 150*ratioWidth,
    height: 150*ratioWidth,
    left: 465*ratioWidth,
    bottom: 150*ratioHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: COLORS.grey,
  }
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap',
    marginRight: 65,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  date:{
    position: 'absolute',
    right: 0,
    height: 60,
    width: 75
  },
  name:{
    style : FONTS.f4
  }
}); 

export default Tabs;
