import { useContext, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import IMember from "../../types/IMember";
import axios from "axios";
import GlobalContext from "../../helper/Context/context";

type UpdateProps = {
    route: any;
};

export default function UpdateMember({ route }: UpdateProps) {
    const memberDetails = route.params;
    const { members, setMembers } = useContext(GlobalContext);

    const [updateMember, setUpdateMember] = useState<IMember>(memberDetails);

    const onSubmit = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/members/${memberDetails.id}`, updateMember);
            if (res.status === 200) {
                let index = members.findIndex((x) => x.id === updateMember.id);
                members[index] = res.data;
            } else {
                window.alert("Index of member to update does not found!");
            }
            setMembers([...members]);
            window.alert("Member updated successfully!!");
        } catch (error) {
            window.alert("Unable to update member!");
        }
    };
    return (
        <SafeAreaView style={styles.container}>

            <TextInput placeholder="residentId" editable={false}
                style={styles.textInputResidentID}
                value={updateMember.residentID}
                onChangeText={(text: string) =>
                    setUpdateMember({ ...updateMember, residentID: text })
                }
            />

            <TextInput placeholder="firstname"
                style={styles.textInput}
                value={updateMember.firstname}
                onChangeText={(text: string) =>
                    setUpdateMember({ ...updateMember, firstname: text })
                }
            />
            <TextInput placeholder="lastname"
                style={styles.textInput}
                value={updateMember.lastname}
                onChangeText={(text: string) =>
                    setUpdateMember({ ...updateMember, lastname: text })
                }
            />
            <TextInput placeholder="address"
                style={styles.textInput}
                value={updateMember.address}
                onChangeText={(text: string) =>
                    setUpdateMember({ ...updateMember, address: text })
                }
            />
            <TextInput placeholder="phone"
                style={styles.textInput}
                value={updateMember.phone}
                onChangeText={(text: string) =>
                    setUpdateMember({ ...updateMember, phone: text })
                }
            />
            <TextInput placeholder="email"
                style={styles.textInput}
                value={updateMember.email}
                onChangeText={(text: string) =>
                    setUpdateMember({ ...updateMember, email: text })
                }
            />
            <Pressable style={styles.pressableButton}
                onPress={onSubmit}>
                <Text>Submit</Text>
            </Pressable>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 2.5,
        borderRadius: 15,
        backgroundColor: 'lightgreen',
        margin: 50,

    },
    textInput: {
        borderColor: 'red',
        borderWidth: 1.5,
        borderRadius: 15,
        backgroundColor: 'lightyellow',
        margin: 5,
        padding: 10,
        width: "70%",
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: '15%'
    },
    textInputResidentID: {
        borderColor: 'red',
        borderWidth: 1.5,
        borderRadius: 15,
        backgroundColor: 'lightyellow',
        margin: 5,
        padding: 10,
        width: "70%",
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: '15%',
        marginTop: 20
    },
    pressableButton: {
        borderColor: 'red',
        borderWidth: 1.5,
        borderRadius: 15,
        backgroundColor: 'lightblue',
        margin: 5,
        padding: 10,
        width: "40%",
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: '30%',
        marginTop: 20
    }
});