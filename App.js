import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStactNavigator, createStackNavigator} from 'react-navigation-stack';

import ListBook from './components/ListBook';
import Troli from './components/Troli';

import * as SQLite from 'expo-sqlite';

const AppNavigator = createStackNavigator({
  TroliScreen: {
    screen: Troli,
  },
  ListScreen: {
    screen: ListBook,
  }
}, {
  initialRouteName: 'ListScreen',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);
const db = SQLite.openDatabase("bookshop.db");

export default class App extends Component {

  constructor() {
    super();
    db.transaction(tx => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS troli (id INTEGER primary key not null, title TEXT, subtitle TEXT, isbn13 TEXT, price REAL, qty INTEGER, datebuy TEXT, subtotal REAL);");
    });
  }

  render(){
    return (
      <AppContainer/>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
