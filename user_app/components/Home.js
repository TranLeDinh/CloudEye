import React from "react";
import { ImageBackground, View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import {COLORS, FONTS, ratioHeight, ratioWidth} from '../constants';

const HomeScreen = ({route, navigation}) => {
	return (
        <View style = {stylesheet.container}>
          <ImageBackground source = {require('../assets/logo.png')} resizeMode ="contain" style={stylesheet.bg} blurRadius ={2}/>
          <Text>'FUC'</Text>
        </View>
	)
}
const stylesheet = StyleSheet.create({
	container: {
        flex: 1,
        paddingTop: 20,
	},
  bg: {
      flex: 1,
      opacity: 0.5,
      margin: 150*ratioWidth,
      bottom: 200*ratioWidth,
  }
});

export default HomeScreen;