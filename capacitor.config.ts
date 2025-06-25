import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ecv.pileandgo',
  appName: 'Pile and Go',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
