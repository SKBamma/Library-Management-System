import axios from "axios";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import ASYNC_STORAGE_KEY from "../../helper/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    setIsLoggedIn: (isloggedIn: boolean) => void;
};
export default function Login({ setIsLoggedIn }: Props) {

    const [email, setEmail] = useState<string>('');

    const onHandleLogin = async () => {
        try {
            if (email.trim() === '') return window.alert("Please enter your email!");
            const response = await axios.get(`http://localhost:5000/users?email=${email}`);
            if (response.status === 200 && response.data.length > 0) {
                // store credentails in asyncs storage
                AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify({ isLoggedIn: true }));
                setIsLoggedIn(true);
                return window.alert("Login success, Welcome!");
            } else {
                return window.alert("Wrong Email");
            }
        } catch (error) {
            return window.alert("Unable to verify user");
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: "white", fontWeight: 'bold' }} >Please Login</Text>

            <TextInput placeholder="Enter your email.."
                style={styles.input}
                value={email}
                autoCapitalize='none'
                onChangeText={(text: string) => setEmail(text)}
            />
            <Pressable onPress={onHandleLogin}
                style={styles.button}>
                <Text style={styles.buttnText}>Login</Text>
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 15,
        margin: "15%",
        height: 470

    },
    input: {
        borderWidth: 1.5,
        borderColor: 'black',
        borderRadius: 15,
        margin: 10,
        padding: 10,
        backgroundColor: 'lightyellow',
        width: "70%",
        alignItems: 'center'
    },
    button: {
        width: "40%",
        borderWidth: 1.5,
        borderColor: 'black',
        borderRadius: 15,
        margin: 10,
        padding: 8,
        backgroundColor: 'lightcoral',
        alignItems: 'center',
        cursor: 'pointer',

    },
    buttnText: {
        fontSize: 15,
        color: 'white'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 25,

    }
});