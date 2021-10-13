import React, { useState, useEffect, Component } from 'react';

import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import { lessThan } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  },
  item: {
    fontSize: 20,
    borderColor: '#060606',
    borderWidth: 3,
    width: 200,
    display: 'flex',
    justifyContent: 'center'
  }
})

var nombre = 'Extraño';
var contadorPartidas = 0;

function Principal({ navigation }) {
  const [isRepeat, setIsRepeat] = useState([false]);
  const handleChangeRepeat = () => {
    if (isRepeat) {
      setIsRepeat(false)
    }
  }

  const handleChangeNotRepeat = () => {
    if (!isRepeat) {
      setIsRepeat(true)
    }
  }

  useEffect(() => {

  })

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
        onChangeText={text => nombre}
      />
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={handleChangeRepeat} style={styles.radioButton}>
          {!isRepeat ? <View style={styles.radioButtonIcon} /> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChangeRepeat}>
          <Text style={styles.radioButtonText}>Con repetición</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={handleChangeNotRepeat} style={styles.radioButton}>
          {isRepeat ? <View style={styles.radioButtonIcon} /> : null}
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
              otherParam: nombre,

            });
          }}
        />
        <Button
          style={{
            textAlign: 'center',
            borderColor: '#060606',
            borderWidth: 1,
            borderRadius: 100,
          }}
          marginTop="200 px"
          title="Ver Historial"
          color="#b4d8b0"
          borderColor="#060606"
          width="200"
          onPress={() => {
            navigation.navigate('Terciaria', {
              otherParam: nombre
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
  const [numeroSecreto, setNumeroSecreto] = useState(null);
  const [fin, setFin] = useState(false);
  const [evaluaciones, setEvaluaciones] = useState([])
  const { itemId } = route.params;
  const { otherParam } = route.params;
  const { repeat } = route.params;


  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    if (numeroSecreto == null) {
      setNumeroSecreto(Math.floor(1000 + Math.random() * 9000));


    }
    if (repeat == false && numeroSecreto != null) {
      if (isRepeated(numeroSecreto) == true) {
        setNumeroSecreto(Math.floor(1000 + Math.random() * 9000));

        console.log(numeroSecreto)
      }

    }



  });

  const isRepeated = (x) => {

    var cnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var cont = 4;
    while (cont > 0) {
      console.log("rem:" + rem)
      console.log("x:" + x)
      var rem = x % 10
      cnt[rem] = cnt[rem] + 1
      x = x / 10;
      x = Math.floor(x);
      cont--;
    }
    console.log(cnt)

    for (var i = 0; i < 10; i++) {
      if (cnt[i] > 1) {
        return true;
      }
    }
    return false;

  }

  const play = () => {

    if (numero != null && numero.toString().length === 4) {
      setContIngresos(contIngresos + 1);
      if (fin == false) {
        evaluarNumeroIngresado(numero);
      }

      console.log(contIngresos)

    }
    else {

      alert("Debe ingresar un número de 4 cifras")
      console.log(numeroSecreto)
    }

    if (contIngresos >= 9) {

      setFin(true);
      guardarPartida("10", "Perdió");
    }
    if (numero != null && numero.toString() === numeroSecreto.toString()) {
      alert("Ganaste!")
      setFin(true);
      guardarPartida(contIngresos, "Ganó");
    }

  }

  const evaluarNumeroIngresado = () => {
    var ns = numeroSecreto.toString();
    var x = numero.toString();
    var bien = 0;
    var regular = 0;
    var mal = 0;
    var aux = ["mal", "mal", "mal", "mal"];

    console.log(ns + "-" + x);
    console.log("a" + ns.length)


    for (var i = 0; i < 4; i++) {

      for (var j = 0; j < 4; j++) {

        if (ns[j] == x[i]) {

          if (j == i) {
            // bien++;
            aux[i] = "bien"
            break;
          }
          else {
            // regular++;
            aux[i] = "regular"
          }

        }
      }
    }
    for (i = 0; i < aux.length; i++) {
      switch (aux[i]) {
        case "bien":
          bien++;
          break;
        case "regular":
          regular++;
          break;
        case "mal":
          mal++;
      }
    }
    //mal = ns.length - bien - regular

    if (mal < 0) {
      mal = 0;
    }

    setEvaluaciones(
      [...evaluaciones, numero + "➡" + bien + "B " + regular + "R " + mal + "M"]);
    return
  }

  { numeroSecreto, evaluaciones }

  const guardarPartida = async (intentos, resultado) => {
      const esteResultado = { nombre: nombre, resultado: resultado, intentos: intentos };
      //AsyncStorage.clear()
      AsyncStorage.setItem(('resultado' + contadorPartidas), JSON.stringify(esteResultado)); 
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'space-around', marginTop: 50 }}>
      <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, justifyContent: 'flex-start' }}>
        {fin ? <Text style={{ marginTop: 0 }}>Nro. Secreto: {numeroSecreto}</Text> : "Nro. Secreto: ? ? ? ?"}
      </Text>
      <Text style={{ margin: 20, fontSize: 20 }}></Text>
      <View style={{ marginTop: 50, display: 'flex', justifyContent: 'center' }}>
        <FlatList style={{ marginTop: 0 }} data={evaluaciones} renderItem={({ item }) => <Text style={styles.item}>{item}</Text>} keyExtractor={(item, index) => index.toString()} />
      </View>

      <View style={{ margin: 20, justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
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
        <View style={{ height: 50 }}>
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

function Terciaria({ route, navigation }) {
  const [resultados, setResultados] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        var array = new Array;
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              // get at each store's key/value so you can work with it
              array.push(JSON.parse(store[i][1]));
            });
          });
        });

        setResultados(array);
        console.log('resultados state: ' + resultados);

      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])


  return (
    (resultados) ? (
    <View style={{ alignItems: 'center', justifyContent: 'space-around', marginTop: 50 }}>
      <View>
        {resultados.map((res) => {
            <View>
              <Text>{res.nombre}</Text>
              <Text>{res.resultado}</Text>
              <Text>{res.intentos}</Text>
            </View>
        })}
      </View>
     {/* <Text style={{ margin: 20, fontSize: 20 }}>{partida}</Text>*/}



      {/*
            <View style={{ margin: 20, justifyContent: 'center' }}>
        <Button style={{ margin: 20 }} title="Principal" onPress={() => navigation.navigate('Principal')} />
      </View>
      <View style={{ margin: 20, justifyContent: 'center' }}>
        <Button style={{ margin: 20 }} title="Anterior" onPress={() => navigation.goBack()} />
      </View>
  
       */}
    </View>
    ) : (<View><Text>No hay resultados</Text></View>)
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen name="Principal" component={Principal}
          options={{ title: 'Menu' }} />
        <Stack.Screen name="Secundaria" component={Secundaria} options={{ title: 'Jugar' }} />
        <Stack.Screen name="Terciaria" component={Terciaria} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;