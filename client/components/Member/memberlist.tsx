import { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, TextInput } from "react-native";
import GlobalContext from "../../helper/Context/context";
import Member from "./member";
import IMember from "../../types/IMember";

export default function MemberList() {
    const { members } = useContext(GlobalContext);
    const [searchText, setSearchText] = useState<string>('');
    const [displayMembers, setDisplayMembers] = useState<IMember[]>(members);


    useEffect(() => {
        setDisplayMembers(members);
    }, [members]);

    const onSearch = (searchText: string) => {
        const arr = members.filter((member) =>
            member.email.toLowerCase().includes(searchText.trim().toLowerCase()));
        setDisplayMembers(arr);
        setSearchText(searchText);
    };
    return (
        <SafeAreaView style={{ backgroundColor: 'lightyellow' }}>
            <TextInput placeholder="Live Search.."
                style={styles.searchText}
                value={searchText}
                onChangeText={(text: string) => onSearch(text)}
            />
            <FlatList
                data={displayMembers}
                renderItem={({ item, index }) =>
                    <Member index={index} data={item} />}
                keyExtractor={item => item.id}

            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    searchText: {
        borderWidth: 1.5,
        borderColor: 'red',
        borderRadius: 12,
        padding: 10,
        margin: 10,
        backgroundColor: 'gold',
        width: '60%'
    }
});