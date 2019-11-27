import firebaseConfig from './firebase.config';

var appConfig={}

appConfig.firebaseConfig = firebaseConfig.config;

appConfig.adminConfig={
    appName: "React App Builder",
    design:{
      sidebarBg:"sidebar-2.jpg", //sidebar-1, sidebar-2, sidebar-3
      dataActiveColor:"rose", //"purple | blue | green | orange | red | rose"
      dataBackgroundColor:"black", // "white | black"
    },
    adminUsers:[],
    allowGoogleAuth:true, 
    allowFacebookAuth: true,
    allowTwitterAuth: true,
    allowRegistration: true,
    googleMapsAPIKey:"AIzaSyCZhq0g1x1ttXPa1QB3ylcDQPTAzp_KUgA"
}

export default appConfig;