import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import AuthorScreen from './Screen/sAuthor';
import { Entypo, FontAwesome5, MaterialIcons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import IAuthor from './types/IAuthor';
import GlobalContext from './helper/Context/context';
import axios from 'axios';
import MemberScreen from './Screen/sMember';
import IMember from './types/IMember';
import Login from './components/Login/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ASYNC_STORAGE_KEY from './helper/constants';
import Logout from './components/Login/Logout';
import Settings from './Screen/sSetings';
const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [members, setMembers] = useState<IMember[]>([]);

  async function loadAuthors() {
    try {
      //get login inform from local storage
      const result = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
      if (result) {
        const data = JSON.parse(result);
        setIsLoggedIn(data.isLoggedIn);
      }
      //then load the app 
      const response = await axios.get("http://localhost:5000/authors");
      if (response.status === 200) {
        setAuthors(response.data);
      }
    } catch (error) {

    }
  }

  async function loadMembers() {
    try {
      const res = await axios.get("http://localhost:5000/members");
      if (res.status === 200) {
        setMembers(res.data);
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    loadAuthors();
    loadMembers();
  }, []);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;

  } else {
    return (
      <GlobalContext.Provider value={{
        authors, setAuthors, members, setMembers,
        setIsLoggedIn
      }}>

        <NavigationContainer>
          <Navigator>

            <Screen name='Member' component={MemberScreen}
              options={{
                title: 'Member', headerShown: false,
                tabBarIcon: ({ color }) =>
                  <FontAwesome5 name='users' color={color} size={25} />
              }}
            />

            <Screen name='Author' component={AuthorScreen}
              options={{
                title: 'Author', headerShown: false,
                tabBarIcon: ({ color }) =>
                  <FontAwesome5 name='user' color={color} size={25} />
              }} />

            <Screen name='settings' component={Settings}
              options={{
                title: 'Settings', headerShown: false,
                tabBarIcon: ({ color }) =>
                  <FontAwesome5 name='cog' color={color} size={25} />
              }} />


          </Navigator>

        </NavigationContainer>

      </GlobalContext.Provider>

    );

  }

}

