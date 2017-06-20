import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
const config = require('./config');
import Login from './src/Login';

export default class App extends React.Component {
  componentWillMount () {
    const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } = config;
      firebase.initializeApp({
        apiKey: apiKey,
        authDomain: authDomain,
        databaseURL: databaseURL,
        projectId: projectId,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
