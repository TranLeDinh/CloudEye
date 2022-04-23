export const COLORS = {
    black: '#1D4C4F',
    lightgrey: '#c5c4c7',
    theme: '#f9f9f9',
    grey: '#83868d',
    green: '#28B67E7',
    lightgreen: '#58CC9A',
    red: '#EB4729',
  };
  
  import {Dimensions} from 'react-native';
  
  export const ratioWidth = Dimensions.get('window').width / 1080;
  export const ratioHeight = Dimensions.get('window').height / 1920;
  
  export const SIZES = {
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
    padding: 15,
  };
  
  export const FONTS = {
    h1: {
      fontFamily: 'Roboto-Bold',
      fontSize: 100 * ratioWidth,
    },
    h2: {
      fontFamily: 'Roboto-Bold',
      fontSize: 50 * ratioWidth,
    },
    h3: {
      fontFamily: 'Roboto-Bold',
      fontSize: 40 * ratioWidth,
    },
    h4: {
      fontFamily: 'Roboto-Medium',
      fontSize: 25 * ratioWidth,
    },
    text: {
      fontFamily: 'Roboto-Regular',
      fontSize: 40 * ratioWidth,
    },
    confirm: {
      fontFamily: 'Roboto-Bold',
      fontSize: 45 * ratioWidth,
    },
    confirm1: {
      fontFamily: 'Roboto-Regular',
      fontSize: 45 * ratioWidth,
    },
    confirm2: {
      fontFamily: 'Roboto-Regular',
      fontSize: 35 * ratioWidth,
    }
  };
  
  export const STYLE = {
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 4,
    }
  };