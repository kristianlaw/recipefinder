import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert, Image } from 'react-native';

export default function App() {
  const [aines, setAines] = useState('');
  const [resepti, setResepti] = useState([]);


  const getResepti = () => {
  fetch('http://www.recipepuppy.com/api/?i=' + aines)
  .then(response => response.json())
  .then(data => setResepti(data.results))
  .catch(err => console.error(err))
}

    const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>

    <View style={styles.listcontainer}>
    <FlatList
        style={{marginLeft : "1%"}}
        ItemSeparatorComponent={listSeparator}
        data={resepti}
        keyExtractor={item => item.results}
        renderItem={({item}) =>
          <View style={{flex:1, flexDirection: 'row', fontSize: 10}}>
            <Image source = {{ uri: item.thumbnail }} style={styles.imageView} />
            <Text>{item.title}</Text>
          </View>
        } />
    </View>

    <TextInput
        style={{fontSize: 18, width: 200}}
        value={aines}
        placeholder="Ingredient"
        onChangeText={(aines) => setAines(aines)}
    />

    <Button title="Find recipe" onPress={getResepti} />
  </View>
);
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    height: '80%'
  },
  imageView: {
    width: '20%',
    height: 90 ,
    margin: 7,
    borderRadius : 7
  }
});
