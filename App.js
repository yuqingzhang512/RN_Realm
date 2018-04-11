/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Realm from 'realm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}},
              {name: 'Cat', properties: {name: 'string'}}]
    }).then(realm => {
      // try {
      //   realm.write(() => {
      //     realm.create('Dog', {name: 'Rex-'+realm.objects('Dog').length});
      //     // realm.create('Dog', {nameA: "1"});
      //   });
      // } catch (e) {
      //   console.log(e);
      // }
      
      realm.beginTransaction();
      realm.create('Dog', {name: "TRAa"});
      realm.create('Cat', {name: "A"});
      // realm.cancelTransaction();
      realm.commitTransaction();

      this.setState({ realm });
    });
  }

  render() {
    const info = this.state.realm
      ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
        <Text>{Realm.defaultPath}</Text>
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
