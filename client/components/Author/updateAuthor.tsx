import React, { useContext, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import IAuthor from '../../types/IAuthor';
import GlobalContext from '../../helper/Context/context';
import axios from 'axios';

type PropsUpdate = {
    navigation: any,
    route: any;
};
export default function updateAuthor({ navigation, route }: PropsUpdate) {
    const author = route.params;
    const { authors, setAuthors } = useContext(GlobalContext);
    const [updateAuthor, setUpdateAuthor] = useState<IAuthor>(author);

    const onSubmit = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/authors/${author.id}`, updateAuthor);
            if (res.status === 200) {
                let index = authors.findIndex((x) => x.id === updateAuthor.id);
                if (index !== -1) {
                    authors[index] = res.data;
                } else {
                    window.alert('index not found!');
                }
                setAuthors([...authors]);
                window.alert('Author updated successfully!');
            }
        } catch (error) {
            window.alert('Unable to update author!');
        }
    };
    return (
        <SafeAreaView style={styles.container}>

            <TextInput editable={false}
                style={styles.TextInput}
                value={updateAuthor.id}
                onChangeText={(text: string) =>
                    setUpdateAuthor({ ...updateAuthor, id: text })}
            />
            <TextInput
                style={styles.TextInput}
                value={updateAuthor.name}
                onChangeText={(text: string) =>
                    setUpdateAuthor({ ...updateAuthor, name: text })}
            />

            <TextInput
                style={styles.TextInput}
                value={updateAuthor.phone}
                onChangeText={(text: string) =>
                    setUpdateAuthor({ ...updateAuthor, phone: text })}
            />

            <TextInput
                style={styles.TextInput}
                value={updateAuthor.email}
                onChangeText={(text: string) =>
                    setUpdateAuthor({ ...updateAuthor, email: text })}
            />
            <Pressable style={styles.button}
                onPress={onSubmit}>
                <Text>Submit</Text>
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 20,
        backgroundColor: 'lightyellow',
        margin: 50

    },
    TextInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        padding: 10,
        margin: 5,
        width: '70%',
        marginLeft: "15%"
    },
    button: {
        borderColor: 'red',
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        margin: 15,
        padding: 5,
        width: '40%',
        marginLeft: '30%',
        backgroundColor: 'red'
        // backgroundColor: 'lightgreen'
    }

});