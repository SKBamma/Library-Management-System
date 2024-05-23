import { createDrawerNavigator } from "@react-navigation/drawer";
import Logout from "../components/Login/Logout";


const { Navigator, Screen } = createDrawerNavigator();
export default function Settings() {
    return (
        <Navigator>
            <Screen name='User-info' component={Logout} />
        </Navigator>
    );
}