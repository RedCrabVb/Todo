import { StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { CustomInput, CustomButtonSend, CustomButtonDelete, ErrorView } from '../components/CustomElement';

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { USER } from '../constants/Storage';
import { api } from '../constants/Api';

interface UserInfo {
  email: string
  username: string
  secretTokenTg: string | null
  confirmedTg: boolean
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [authorized, isAuthorized] = useState(false)
  const [versionText, setVersion] = useState('')
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)

  function checkUser() {
    AsyncStorage.getItem(USER).then(data => {
      if (data == null) {
        navigation.navigate('LoginModal')
      } else {
        isAuthorized(true)
        fetch(api.version)
          .then(d => d.json())
          .then(r => {
            setVersion(r)
            loadProfil()
          })
      }
    });
  }

  function botDisable() {
    AsyncStorage.getItem(USER).then(data => {

      const requestOptions = {
        method: 'POST',
        headers: new Headers(
          {
            'Content-Type': 'application/json',
            'Authorization': data != null ? data.toString() : '',
          }
        ),
      }

      fetch(api.disableTelegram, requestOptions)
        .then(d => d.json())
        .then(r => {
          console.log(r)
          setUserInfo(r)
        })
    })
  }

  function loadProfil() {
    AsyncStorage.getItem(USER).then(data => {
      const requestOptions = {
        method: 'GET',
        headers: new Headers(
          {
            'Content-Type': 'application/json',
            'Authorization': data != null ? data.toString() : ''
          }
        ),
      }

      fetch(api.userInfo, requestOptions)
        .then(d => d.json())
        .then(r => {
          console.log(r)
          setUserInfo(r)
        })
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!authorized) {
        checkUser()
      } else {
        loadProfil()
      }
    });
    return unsubscribe;
  }
  );

  return (
    <View style={styles.container}>
      {
        userInfo ? <>
          <Text>??????????: {userInfo.email}</Text>
          <Text>??????????: {userInfo.username}</Text>
          {userInfo.secretTokenTg != null && !userInfo.confirmedTg ?
            <Text>?????? ?????? ???????????????? ????????: {userInfo.secretTokenTg}</Text>
            : <></>
          }

          <Text>???????????????????? ?? ???????????????????? {!userInfo.confirmedTg ? <Text>????</Text> : <></>} ????????????????????????</Text>

          {userInfo.confirmedTg ? <CustomButtonSend
            text="?????????????? ???? ????????"
            onPress={botDisable} /> : <></>}
        </> : <ActivityIndicator size="large" color="#ce1c1c" />
      }
      <Text style={{ color: 'blue' }}
        onPress={() => Linking.openURL('https://t.me/note_30_05_bot')}>
        Telegram bot
      </Text>

      <Text>?????????????? API: ${versionText}</Text>
      <View >
        <CustomButtonDelete text="???????????????? ????????????" onPress={() => {
          console.log("clear data")
          AsyncStorage.clear().then(d => console.log(d))
          isAuthorized(false)
          checkUser()
          navigation.navigate('Home');
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
