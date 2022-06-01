import {StyleSheet, StatusBar} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        maxWidth: 600,
        justifyContent: 'center',
    },
    textBig: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10,
      },
      root: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#eaeaea',
      },
      editor: {
        flex: 1,
        padding: 0,
        borderColor: 'gray',
        minHeight: 340,
        borderWidth: 1,
        marginHorizontal: 30,
        marginVertical: 5,
        backgroundColor: 'white',
      },
});
