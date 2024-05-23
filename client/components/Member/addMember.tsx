import { useContext, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import IMember from "../../types/IMember";
import { nanoid } from "nanoid";
import axios from "axios";
import GlobalContext from "../../helper/Context/context";

export default function AddMember() {
    const [member, setMember] = useState<IMember>(
        { id: nanoid(), residentID: '', firstname: '', lastname: '', address: '', phone: '', email: '' });

    const { members, setMembers } = useContext(GlobalContext);
    const onSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5000/members", member);
            if (response.status === 201) {
                setMembers([...members, response.data]);
                window.alert("Member added successfully!");
            }
        } catch (error) {

        }
    };
    return (
        <SafeAreaView style={styles.constiner}>

            <TextInput placeholder=" resident Id.."
                style={styles.inputText}
                value={member.residentID}
                onChangeText={(text: string) =>
                    setMember({ ...member, residentID: text })}
            />


            <TextInput placeholder="firstname.."
                style={styles.inputText}
                value={member.firstname}
                onChangeText={(text: string) =>
                    setMember({ ...member, firstname: text })}
            />


            <TextInput placeholder="lastname.."
                style={styles.inputText}
                value={member.lastname}
                onChangeText={(text: string) =>
                    setMember({ ...member, lastname: text })}
            />


            <TextInput placeholder="address.."
                style={styles.inputText}
                value={member.address}
                onChangeText={(text: string) =>
                    setMember({ ...member, address: text })}
            />


            <TextInput placeholder=" phone.."
                style={styles.inputText}
                value={member.phone}
                onChangeText={(text: string) =>
                    setMember({ ...member, phone: text })}
            />


            <TextInput placeholder="email.."
                style={styles.inputText}
                value={member.email}
                onChangeText={(text: string) =>
                    setMember({ ...member, email: text })}
            />

            <Pressable style={styles.pressable}
                onPress={onSubmit}>

                <Text>Submit</Text>
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    constiner: {
        flex: 1,
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'lightgreen',
        borderRadius: 15,
        margin: 50
    },
    inputText: {
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'lightyellow',
        borderRadius: 10,
        margin: 8,
        padding: 10
    },
    pressable: {
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'gold',
        alignItems: 'center',
        width: '40%',
        padding: 10, marginTop: 20
    }
});