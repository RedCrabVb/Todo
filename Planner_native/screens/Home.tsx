import { StyleSheet, Linking } from 'react-native';
import { CustomInput, CustomButton, ErrorView } from '../components/CustomElement';

import { useState, useEffect } from 'react';
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

      console.log(JSON.stringify(userInfo))

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
          <Text>Почта: {userInfo.email}</Text>
          <Text>Логин: {userInfo.username}</Text>
          {userInfo.secretTokenTg != null && !userInfo.confirmedTg ?
            <Text>Код для подписки бота: {userInfo.secretTokenTg}</Text>
            : <></>
          }

          <Text>Оповещения в телеграмме {!userInfo.confirmedTg ? <Text>не</Text> : <></>} активированы</Text>

          {userInfo.confirmedTg ? <CustomButton
            text="Отписка от бота"
            onPress={botDisable} /> : <></>}
        </> : <></>
      }
      <Text style={{ color: 'blue' }}
        onPress={() => Linking.openURL('https://t.me/note_30_05_bot')}>
        Telegram bot
      </Text>

      <Text>Верисия API: ${versionText}</Text>
      <View >
        <CustomButton text="Сбросить данные" bcolor='red' onPress={() => {
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
