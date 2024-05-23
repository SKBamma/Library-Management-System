import { createDrawerNavigator } from "@react-navigation/drawer";
import AddMember from "../components/Member/addMember";
import MemberList from "../components/Member/memberlist";
import UpdateMember from "../components/Member/updateMember";

const { Navigator, Screen } = createDrawerNavigator();

export default function MemberScreen() {

    return (
        <Navigator>

            <Screen name='Member-List' component={MemberList} />
            <Screen name='Add-Member' component={AddMember} />
            <Screen name='Edit-Member' component={UpdateMember} />

        </Navigator>
    );
}