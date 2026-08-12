import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zencheztoi.coursdelasouris',
  appName: 'Le Cours de la Souris',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    hostname: 'coursdelasouris.fr',
    basePath: '/',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#f7f3ec',
      androidSplashResourceName: 'splash',
      iosSplashResourceName: 'splash',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
  ios: {
    bundleIdentifier: 'com.zencheztoi.coursdelasouris',
    scheme: 'coursdelasouris',
  },
  android: {
    packageName: 'com.zencheztoi.coursdelasouris',
    buildOptions: {
      keystorePath: 'android/app/keystore.jks',
      keystoreAlias: 'coursdelasouris',
    },
  },
};

export default config;