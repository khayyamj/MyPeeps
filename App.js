import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
const config = require('./config');
import Login from './src/Login';
import Loader from './src/Loader';
import PeopleList from './src/PeopleList';

export default class App extends React.Component {
  state = {
    loggedIn: null
  }
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
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true })
        } else {
          this.setState({ loggedIn: false })
        }
      })
  }

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true:
        return <PeopleList />
      case false:
        return <Login />
      default:
        return <Loader size='large' />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderInitialView()}
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
});
