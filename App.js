import React, { useState,useEffect } from 'react';

import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    display: 'flex',
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
      <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, margin: 30 }}>Juego de los números</Text>
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
        placeholder='Ingrese nombre'
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
      <View style={{ marginTop: 10, width: 190, height: 190 }}>
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
              repeat: isRepeat,
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
  const [numero, setNumero] = useState(null);
  const [contIngresos, setContIngresos] = useState(0);
  const [numeroSecreto,setNumeroSecreto] = useState(null);
  const [fin,setFin] = useState(false);
  const { itemId } = route.params;
  const { otherParam } = route.params;
  const {repeat} = route.params;

  useEffect( () => {
    // Actualiza el título del documento usando la API del navegador
    if ( numeroSecreto == null)
    {
     setNumeroSecreto(Math.floor(1000 + Math.random() * 9000));
    

    }
    if (repeat == false && numeroSecreto != null )
    {
      if (isRepeated(numeroSecreto) == true)
      {    
       setNumeroSecreto(Math.floor(1000 + Math.random() * 9000));

        console.log(numeroSecreto)
      }
   
    }

  
  
  });

  const isRepeated = (x) => {
  
    var cnt = [0,0,0,0,0,0,0,0,0,0]
    var cont = 4;
    while (cont > 0){
      console.log("rem:"+rem)
      console.log("x:"+x)
      var rem = x % 10
      cnt[rem] = cnt[rem] + 1
      x = x / 10;
      x=Math.floor(x);
      cont--;
    }
    console.log(cnt)

    for ( var i = 0;i<10;i++){
      if (cnt[i] > 1)
      {
        return true;
      }
    }
    return false;

  }

  const play = () => {
    
    if (numero != null && numero.toString().length === 4)
    {
      setContIngresos(contIngresos + 1);
      console.log(contIngresos)
      
    }
    else
    {
    
      alert("El numero ingresado es invalido")
      console.log(numeroSecreto)
    }

    if (contIngresos >= 10)
    {
      
      setFin(true);
    }
    if (numero.toString() === numeroSecreto.toString())
    {
      alert("Ganaste!")
      setFin(true);
    }

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent:'space-around' }}>
      <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 20,justifyContent:'flex-start' }}>
      {fin ? <Text>Nro. Secreto: {numeroSecreto}</Text> : "Nro. Secreto: ????"}
      </Text>
      <Text style={{ margin: 20, fontSize: 20 }}></Text>

      <View style={{ margin: 20, justifyContent: 'center',display:'flex',flexDirection:'row',alignItems:'flex-end' }}>
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
        placeholder='Ingrese un numero'
        onChangeText={text => setNumero(text)}
      />  
      <View style={{height:50}}>
      <Button
     
          title="PLAY"
          onPress={() =>
           play()
          }
        />
      </View>

      </View>
      {/*
            <View style={{ margin: 20, justifyContent: 'center' }}>
        <Button style={{ margin: 20 }} title="Principal" onPress={() => navigation.navigate('Principal')} />
      </View>
      <View style={{ margin: 20, justifyContent: 'center' }}>
        <Button style={{ margin: 20 }} title="Anterior" onPress={() => navigation.goBack()} />
      </View>
  
       */}
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