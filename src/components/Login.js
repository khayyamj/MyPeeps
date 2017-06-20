import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import firebase from 'firebase';

const styles = StyleSheet.create({
  form: {
    paddingBottom: 10,
    width: 200,
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange,
    width: 200,
  },
  loginButtonArea: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  errorMessage: {
    marginTop: 15,
    fontSize: 15,
    color: 'red',
    alignSelf: 'center',
  },
  tempButton: {
    width: 200,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempButtonText: {
    color: 'white',

  }
});

const LoginButton = MKButton.coloredButton()
  .withText('LOGIN')
  .build();

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }

  onButtonPress() {
    console.log('Clicked Button!!');
    const { email, password } = this.state;
    this.setState({error: '', loading: true});
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onAuthSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onAuthSuccess.bind(this))
          .catch(this.onAuthFailed.bind(this));
      })
  }

  onAuthSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }

  onAuthFailed() {
    this.setState ({
      error: 'Authentication Failed',
      loading: false,
    });
  }

  renderLoader() {
    if (this.state.loader) {
      return <Loader size='large'/>
    } else {
      // return <LoginButton onPress={this.onButtonPress.bind(this)} />
      return (
        <TouchableOpacity style={styles.tempButton}
          onPress={() => this.onButtonPress()}>
          <Text style={styles.tempButtonText}>LOGIN</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { container, welcome, form, fieldStyles, loginButtonArea, errorMessage } = styles;
    return (
      <View style={form}>
        <Text style={welcome}>Login or create an account</Text>
        <MKTextField
          text={this.state.email}
          onTextChange={email => this.setState({ email })}
          textInputStyle={fieldStyles}
          placeholder={'Email...'}
          tintColor={MKColor.Teal}
        />
        <MKTextField
          text={this.state.password}
          onTextChange={password => this.setState({ password })}
          textInputStyle={fieldStyles}
          placeholder={'Password...'}
          tintColor={MKColor.Teal}
          password={true}
        />
        <Text style={errorMessage}>
          {this.state.error}
        </Text>
        <View style={loginButtonArea}>
          {this.renderLoader()}
        </View>
      </View>
    );
  }
}
