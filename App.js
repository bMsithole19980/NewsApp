import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import CategoriesScreen from './Pages/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import ArticleListScreen from './Pages/ArticleListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleDescrScreen from './Pages/ArticleDescrScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Category'>
          <Stack.Screen name ='Category' component={CategoriesScreen}/>
          <Stack.Screen name='ArticleList' component={ArticleListScreen}/>
          <Stack.Screen name='ArticleDescr' component={ArticleDescrScreen}/>
        </Stack.Navigator>

      </NavigationContainer>

   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
