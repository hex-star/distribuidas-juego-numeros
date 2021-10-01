import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    display:'flex',
    marginLeft: 20
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
    width: 150
  }
})



function Principal({ navigation }) {
  const [isRepeat, setIsRepeat] = useState([true]);
  const [nombre, setNombre] = useState('Extraño');
  const handleChangeRepeat = () => {
    if (!isRepeat) {
      setIsRepeat(true)
    }  
  }

  const handleChangeNotRepeat = () => {
    if (isRepeat) {
      setIsRepeat(false)
    }  
  }

  const handleSubmit = () => {
    alert(nombre)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <Text style={{ fontStyle:'normal', fontWeight: 'bold', fontSize: 20, margin: 30 }}>Juego de los números</Text>
      <TextInput 
        style={{
          margin: 10,
          textAlign: 'center',
          borderColor: '#060606',
          borderWidth: 1,
          borderRadius: 10,
          width: 200,
          height: 50,
          backgroundColor: '#b4d8b0',
        }}
        placeholder= 'Ingrese nombre'
        onChangeText={text => setNombre(text)}
      />
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={handleChangeRepeat} style={styles.radioButton}>
          {isRepeat ? <View style={styles.radioButtonIcon} /> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChangeRepeat}>
          <Text style={styles.radioButtonText}>Con repetición</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={handleChangeNotRepeat} style={styles.radioButton}>
          {!isRepeat ? <View style={styles.radioButtonIcon} /> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChangeNotRepeat}>
          <Text style={styles.radioButtonText}>Sin repetición</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:10, width: 190, height: 190 }}>
      <Button
      style={{
          textAlign: 'center',
          borderColor: '#060606',
          borderWidth: 1,
          borderRadius: 100,
        }}
        marginTop="200 px"
        title="Comenzar"
        color="#b4d8b0"
        borderColor="#060606"
        width="200"
        onPress={() => {
          navigation.navigate('Secundaria', {
            itemId: 86,
            otherParam: 'Soy el superagente ' + nombre
          });
        }}
      />
      </View>
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