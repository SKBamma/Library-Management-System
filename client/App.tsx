import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';
import AuthorScreen from './Screen/sAuthor';
import { Entypo, FontAwesome5, MaterialIcons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import IAuthor from './types/IAuthor';
import GlobalContext from './helper/Context/context';
import axios from 'axios';
const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  async function loadAuthors() {
    try {
      const response = await axios.get("http://localhost:5000/authors");
      if (response.status === 200) {
        setAuthors(response.data);
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    loadAuthors();
  }, []);

  return (
    <GlobalContext.Provider value={{ authors, setAuthors }}>

      <NavigationContainer>
        <Navigator>


          <Screen name='Author' component={AuthorScreen} options={{
            title: 'Author', headerShown: false,
            tabBarIcon: ({ color }) =>
              <FontAwesome name='user' color={color} size={25} />
          }} />



        </Navigator>

      </NavigationContainer>

    </GlobalContext.Provider>

  );

}

