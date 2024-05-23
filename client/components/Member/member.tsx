import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import IMember from "../../types/IMember";
import { useContext } from "react";
import GlobalContext from "../../helper/Context/context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

type MemberProps = {
    data: IMember,
    index: number;
};
export default function Member({ data, index }: MemberProps) {

    const { members, setMembers } = useContext(GlobalContext);
    const navigation = useNavigation();

    const onNavigateToUpdate = () => {
        navigation.navigate('edit-member', data);
    };

    const onDelete = async () => {
        window.alert("Are you sure to delete this member?");
        try {
            const response = await axios.delete(`http://localhost:5000/members/${data.id}`);
            if (response.status === 200) {
                const arr = members.filter((member) => member.id !== data.id);
                setMembers(arr);
                window.alert("Member deleted successfully!");
            }

        } catch (error) {
            window.alert("Unable to delete member!");
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text>Member Id: {data.id}</Text>
            <Text>Resident iD: {data.residentID}</Text>
            <Text>First Name: {data.firstname}</Text>
            <Text>Last Name: {data.lastname}</Text>
            <Text>Address: {data.address}</Text>
            <Text>Phone: {data.phone}</Text>
            <Text>Email: {data.email}</Text>

            <View style={styles.viewPressable}>

                <Pressable style={styles.pressableButtonUpdate}
                    onPress={onNavigateToUpdate}>
                    <Text>Update</Text>
                </Pressable>

                <Pressable style={styles.pressableButtonDelete}
                    onPress={onDelete}>
                    <Text>Delete</Text>
                </Pressable>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        margin: 10,
        borderColor: "red",
        borderWidth: 2,
        alignItems: 'center',
        backgroundColor: 'lightblue'

    },
    viewPressable: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-',
        margin: 10,
        padding: 10
    },
    pressableButtonUpdate: {
        padding: 10,
        margin: 8,
        borderColor: "red",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'gold'
    },
    pressableButtonDelete: {
        padding: 10,
        margin: 8,
        borderColor: "red",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'red'
    }
});