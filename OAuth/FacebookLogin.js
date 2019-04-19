import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';
import { Facebook } from 'expo';

const FB_APP_ID = '2331852303804066';

export default class FacebookLogin extends React.Component {
  state = {
    result: null,
  };



  render() {
    return (
      <View style={styles.container}>
        <Button title="Open FB Auth" onPress={this._handleFacebook} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
      </View>
    );
  }

  _handleFacebook = async function logIn() {
    try {
      let redirectUrl = 'https://www.google.com/';
        //AuthSession.getRedirectUrl();
      alert(redirectUrl);

      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('FB_APP_ID', {
        permissions: ['public_profile','email','user_age_range','user_birthday','user_gender'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`
          +
              `&redirect_uri=${encodeURIComponent(redirectUrl)}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  _handlePressAsync = async () => {
    let result = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, ['public_profile', 'user_age_range','user_birthday','user_gender']);

    // let redirectUrl = AuthSession.getRedirectUrl();
    // let result = await AuthSession.startAsync({
    //   authUrl:
    //     `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
    //     `&client_id=${FB_APP_ID}` +
    //     `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    // });
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
