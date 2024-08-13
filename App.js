import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import store from './redux/store';
import ProductListScreen from './screens/ProductListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Shopping" component={ProductListScreen} />
         
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
