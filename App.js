import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Principal({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 20, margin: 30}}>Pantalla Principal</Text>
      <Button 
        title="Ir a pantalla secundaria"
        onPress={() => {
          navigation.navigate('Secundaria', {
            itemId: 86,
            otherParam: 'Soy el superagente ',
          });
        }}
      />
    </View>
  );
}

function Secundaria({ route, navigation }) {
  /* Obtengo los parámetros pasados */
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 20}}>Pantalla Secundaria</Text>
      <Text style={{margin: 20, fontSize: 20}}>{JSON.stringify(otherParam) + ' ' + JSON.stringify(itemId)}</Text>
      <View style={{margin:20,justifyContent: 'center'}}>
        <Button 
          title="Me llamo otra vez..."
          onPress={() =>
            navigation.push('Secundaria', {
              itemId: Math.floor(Math.random() * 100),
              otherParam: "y yo soy el agente "
            })
          }
        />
      </View>
      <View style={{margin:20,justifyContent: 'center'}}>
        <Button style={{margin: 20}} title="Principal" onPress={() => navigation.navigate('Principal')} />
      </View>
      <View style={{margin:20,justifyContent: 'center'}}>
        <Button style={{margin: 20}} title="Anterior" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen name="Principal" component={Principal}  
                      options={{ title: 'Primera' }} />
        <Stack.Screen name="Secundaria" component={Secundaria} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;