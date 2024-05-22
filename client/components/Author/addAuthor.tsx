import { useContext, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import IAuthor from "../../types/IAuthor";
import { nanoid } from "nanoid";
import axios from "axios";
import GlobalContext from "../../helper/Context/context";

export default function AddAuthor() {
    const [author, setAuthor] = useState<IAuthor>(
        { id: nanoid(), name: '', phone: '', email: '' }
    );

    const { authors, setAuthors } = useContext(GlobalContext);
    const onSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5000/authors", author);
            if (response.status === 201) {
                setAuthors([...authors, response.data]);
            }
        } catch (error) {

        }
    };
    return (
        <SafeAreaView style={styles.conatiner}>
            <Text style={styles.textHeader}> Add Author</Text>
            <TextInput placeholder="name"
                style={styles.input}
                value={author.name}
                onChangeText={(text: string) =>
                    setAuthor({ ...author, name: text })} />


            <TextInput placeholder="phone"
                style={styles.input}
                value={author.phone}
                onChangeText={(text: string) =>
                    setAuthor({ ...author, phone: text })} />

            <TextInput placeholder="email"
                style={styles.input}
                value={author.email}
                onChangeText={(text: string) =>
                    setAuthor({ ...author, email: text })} />

            <Pressable style={styles.button}
                onPress={onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        margin: 20
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 15,
        backgroundColor: 'lightyellow',
        padding: 10,
        margin: 8,
        width: "70%",
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: "12%"
    },
    button: {
        position: 'absolute',
        left: 100,
        top: 400,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'lightyellow',
        width: "30%",

    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    }
});