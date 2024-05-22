import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddAuthor from '../components/Author/addAuthor';
import updateAuthor from '../components/Author/updateAuthor';
import Author from '../components/Author/author';
import AuthorList from '../components/Author/authorlist';


const { Navigator, Screen } = createDrawerNavigator();

export default function AuthorScreen() {

    return (

        <Navigator>
            <Screen name='author-list' component={AuthorList} />
            <Screen name='add-author' component={AddAuthor} />
            <Screen name='edit-author' component={updateAuthor} />

        </Navigator>

    );
};