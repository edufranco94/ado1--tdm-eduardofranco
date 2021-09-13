import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {

  const [data, setData] = useState([]);

  // Get data from Json place holder api
  const getData = async () => {

    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await response.json();
    setData(json);
  }

  // Componente do Usuario
  const User = ({nome, username, email, rua}) => {

    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return (
      <View style={styles.container}>
        <ShowDetails display={modal} toogleModal={mudaModal} email={email} rua={rua}/>

        <Pressable onPress={mudaModal} style={styles.paragraph}>
          <Text style={styles.title}>Nome:</Text>
          <Text style={styles.title2}>{nome}</Text>

          <Text style={styles.title}>Username:</Text>
          <Text style={styles.title2}>{username}</Text>
        </Pressable>
      </View>
    )
  }

  // Exibe os detalhes do usuario
  const ShowDetails = ({display, toogleModal, email, rua}) => (
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
              <Pressable onPress={toogleModal}>
                <Text style={styles.title}>--- Informacoes pessoais ---</Text>
                <Text>Email: {email}</Text>
                
                <Text style={styles.title}>--- Endereco ---</Text>
                <Text>Rua: {rua}</Text>
              </Pressable>
        </View>
      </View>
    </Modal>
  )

  // Rederiza um usuario
  const renderUser = ({item}) => (
    <View>
      <User nome={item.name} username={item.username} email={item.email} rua={item.address.street}/>
    </View>
  )

  // Realiza a requisicao para o jsonplaceholder ANTES da pagina ser renderizada.
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderUser}
        keyExtractor={item => item.id}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 18,
    padding: 10,
  },
  title2: {
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
