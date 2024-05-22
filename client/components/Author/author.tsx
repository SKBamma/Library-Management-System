import React, { useContext } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import IAuthor from '../../types/IAuthor';
import axios from 'axios';
import GlobalContext from '../../helper/Context/context';

type PropsAuthor = {
    data: IAuthor,
    index: number;
};
export default function Author({ data, index }: PropsAuthor) {
    const { id, name, phone, email } = data;
    const { setAuthors, authors } = useContext(GlobalContext);

    const ondelete = async () => {
        window.alert("Are you sure to delete?");
        try {
            const deleted = await axios.delete(`http://localhost:5000/authors/${id}`);
            if (deleted.status === 200) {
                let arr = authors.filter((author) => author.id !== id);
                setAuthors(arr);
                window.alert("author deleted successfully!");
            }

        } catch (error) {
            window.alert("Unable to delete!");
        }
    };
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.textName}>Id: {id}</Text>
            <Text style={styles.textName}>Name: {name}</Text>
            <Text style={styles.textName}>Phone: {phone}</Text>
            <Text style={styles.textName}>Email: {email}</Text>

            <View style={styles.viewTouchable}>
                <Pressable style={styles.touchableButtonUpdate}>
                    <Text style={styles.textTouchable}>Update</Text>
                </Pressable>

                <Pressable style={styles.touchableButtonDelete}
                    onPress={ondelete}>
                    <Text style={styles.textTouchable}>delete</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
    },
    textName: {
        fontSize: 20,
        color: 'black'
    },
    viewTouchable: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10
    },
    textTouchable: {
        margin: 5,
        padding: 5,

    },
    touchableButtonDetail: {

        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 20,
        alignItems: 'center',
        padding: 5,
        margin: 5,
        backgroundColor: "lightgold"
    },
    touchableButtonDelete: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 20,
        alignItems: 'center',
        padding: 5,
        margin: 5,
        backgroundColor: "lightpink"
    },
    touchableButtonUpdate: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        alignItems: 'center',
        padding: 5,
        margin: 5,
        backgroundColor: "lightgrey"
    },
});