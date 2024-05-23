import { useContext } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import GlobalContext from "../../helper/Context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ASYNC_STORAGE_KEY from "../../helper/constants";

export default function Logout() {
    const { setIsLoggedIn } = useContext(GlobalContext);
    const onlogout = async () => {
        try {
            window.alert("are you sure to logout?");
            await AsyncStorage.removeItem(ASYNC_STORAGE_KEY);
            setIsLoggedIn(false);
            window.alert("Logout successsful");
        } catch (error) {
            window.alert("Unable to logout!");
        }


    };
    return (
        <SafeAreaView style={styles.container}>

            <Pressable style={styles.pressableButton}
                onPress={onlogout}>
                <Text>Logout</Text>
            </Pressable>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 12,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'pink',
        margin: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressableButton: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1.3,
        backgroundColor: 'yellow',
        margin: 10,
        padding: 10
    }
});