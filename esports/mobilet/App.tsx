import { Background } from './src/components/Background';
import { StatusBar } from 'expo-status-bar';
import { Loading } from './src/components/Loading'
import { Routes } from './src/routes'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black

} from '@expo-google-fonts/inter'

import { Subscription } from 'expo-modules-core'
import './src/services/notification'
import { getPushNotification } from './src/services/getPushNotification';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';


export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNoticationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotification();
  });

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseNoticationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      if (getNotificationListener.current && responseNoticationListener.current){
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNoticationListener.current)
      }
    }
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
