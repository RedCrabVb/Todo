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
    registrationName, tabsName, creatorNoteName, editNoteName, createSmartTaskName, editSmartTaskName
} from '../src/utils/ScreenNames'

import HomeScreen from './screens/HomeScreen';
import NoteScreen from './screens/NoteScreen';
import LogIn from './screens/stack/LogIn';
import Registration from './screens/stack/Registration';
import TaskScreen from './screens/TaskScreen';
import CreatorTodo from "./screens/stack/CreatorTodo";
import CreatorSmartTask from "./screens/stack/CreatorSmartTask";

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
                    iconName = focused ? 'md-book' : 'md-book-outline';

                } else if (rn === taskName) {
                    iconName = focused ? 'briefcase-sharp' : 'briefcase-outline';
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
                <Tab.Screen name={creatorNoteName} component={CreatorTodo}/>
                <Tab.Screen name={editNoteName} component={CreatorTodo}/>
                <Tab.Screen name={createSmartTaskName} component={CreatorSmartTask}/>
                <Tab.Screen name={editSmartTaskName} component={CreatorSmartTask}/>
                <Tab.Screen name={registrationName} component={Registration}/>
                <Stack.Screen name={tabsName} component={MyBottomMenu} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;