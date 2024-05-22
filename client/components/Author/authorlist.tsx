import { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import GlobalContext from "../../helper/Context/context";
import Author from "./author";
import IAuthor from "../../types/IAuthor";

export default function AuthorList() {
    const { authors } = useContext(GlobalContext);
    const [searchAuthor, setSearchAuthor] = useState('');

    const [displayAuthor, setDispalyAuthor] = useState<IAuthor[]>(authors);

    useEffect(() => {
        setDispalyAuthor(authors);
    }, [authors]);

    const onSearchAuthor = (searchAuthor: string) => {
        const arr = authors.filter((author) =>
            author.name.toLowerCase().includes(searchAuthor.trim().toLowerCase()));
        setDispalyAuthor(arr);
        setSearchAuthor(searchAuthor);
    };

    return (

        <SafeAreaView>


            <TextInput placeholder="Search Author"
                style={styles.inputText} value={searchAuthor}
                onChangeText={(text: string) => onSearchAuthor(text)}
            />
            <FlatList
                data={displayAuthor}
                renderItem={({ item, index }) =>
                    <Author index={index} data={item} />}
                keyExtractor={item => item.id}
            />


        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    inputText: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'lightyellow',
        width: "70%",
        marginLeft: "2%",
        padding: 10,
        margin: 15

    }
});