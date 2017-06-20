import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Login from './src/components/Login';
import Loader from './src/components/Loader';
import PeopleList from './src/components/PeopleList';
import reducers from './src/reducers/PeopleReducer';

const config = require('./config');
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
      <Provider store={store}>
        <View style={styles.container}>
          {this.renderInitialView()}
        </View>
      </Provider>
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
