import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
    taskName,
    noteName,
    homeName,
    logInName,
    registrationName, tabsName, creatorNoteName, editNoteName
} from '../src/utils/ScreenNames'

import HomeScreen from './screens/HomeScreen';
import NoteScreen from './screens/NoteScreen';
import LogIn from './screens/stack/LogIn';
import Registration from './screens/stack/Registration';
import TaskScreen from './screens/TaskScreen';
import CreatorTest from "./screens/stack/CreatorTest";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyBottomMenu() {
   return  (<Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
            tabBarInactiveTintColor: "#288bf4",
            tabBarActiveTintColor: "#045063",
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey',
            labelStyle: {paddingBottom: 10, fontSize: 10},
            style: {padding: 10, height: 70},
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';

                } else if (rn === noteName) {
                    iconName = focused ? 'game-controller' : 'game-controller-outline';

                } else if (rn === taskName) {
                    iconName = focused ? 'settings' : 'settings-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color}/>;
            },
        })}>

        <Tab.Screen name={homeName} component={HomeScreen}/>
        <Tab.Screen name={noteName} component={NoteScreen}/>
        <Tab.Screen name={taskName} component={TaskScreen}/>


    </Tab.Navigator>)
}


function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs">
                <Tab.Screen name={logInName} component={LogIn}/>
                <Tab.Screen name={creatorNoteName} component={CreatorTest}/>
                <Tab.Screen name={editNoteName} component={CreatorTest}/>
                <Tab.Screen name={registrationName} component={Registration}/>
                <Stack.Screen name={tabsName} component={MyBottomMenu} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;