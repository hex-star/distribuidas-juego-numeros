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



function Principal({ navigation }) {
  const [isRepeat, setIsRepeat] = useState([false]);
  const [nombre, setNombre] = useState('Extraño');
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

  const handleSubmit = () => {
    alert(nombre)
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
        onChangeText={text => setNombre(text)}
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
      guardarPartida();
    }
    if (numero != null && numero.toString() === numeroSecreto.toString()) {
    //  alert("Ganaste!")
      setFin(true);

    //do what you need here
    guardarPartida();
  
    }

  }

  const evaluarNumeroIngresado = async () => {
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
  const guardarPartida = async () => {

      // await AsyncStorage.setItem(otherParam,  JSON.stringify( numeroSecreto)   )
      //await AsyncStorage.setItem('@'+ otherParam,   JSON.stringify(evaluaciones)   )
      //AsyncStorage.clear()

      //await AsyncStorage.getItem('@'+ otherParam)

      //    if (await AsyncStorage.getItem(otherParam) == null){
      //    await AsyncStorage.setItem(otherParam, + '{' + numeroSecreto + ',' + evaluaciones + '}'  )
      //  }
      //  else{
        await evaluarNumeroIngresado(numero);
      await AsyncStorage.setItem(otherParam, await AsyncStorage.getItem(otherParam) + '{"numero":' + '"' + +numeroSecreto + '"' + ', "evaluaciones":' + '"' + evaluaciones + '"' + '}' + ',')
      //   }

      alert(await AsyncStorage.getItem(otherParam))

    console
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
  const { otherParam } = route.params;
  const [partida, setPartida] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const aux = await AsyncStorage.getItem(otherParam)
       // console.log(JSON.parse('[' + aux.slice(4, -1) + ']'))
      //  setPartida(JSON.parse('[' + aux.slice(4, -1) + ']'))
      setPartida('[' + aux.slice(4, -1) + ']')
      //  console.log('[' + aux.slice(4, -1) + ']')
        //console.log(partida)
        // setPartida((aux.slice(4, -1)));



      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])






  return (
    <View style={{ alignItems: 'center', justifyContent: 'space-around', marginTop: 50 }}>
      <View>

          {/*partida.map((item) => {
            return (
              <View>
                <Text>{item.numero}</Text>
                <Text>{item.evaluaciones}</Text>
              </View>)


          })*/}
    
      </View>
      <Text style={{ margin: 20, fontSize: 20 }}>{partida}</Text>



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
        <Stack.Screen name="Terciaria" component={Terciaria} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;