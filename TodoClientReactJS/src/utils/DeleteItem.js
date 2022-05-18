import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "./Storage";
import {timerTracker as timerTrackerApi} from "./Api";
import {taskName} from "./ScreenNames";

export function deleteItem(id, navigation, topPageName, api) {
    AsyncStorage.getItem(USER).then(data => {
        if (id != -1) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': data
                }
            }
            fetch(api + `/${id}`, requestOptions)
                .then((data) => {
                    navigation.popToTop(topPageName)
                })
                .catch((error) => alert(error))
        } else {
            navigation.popToTop(topPageName)
        }
    })
}