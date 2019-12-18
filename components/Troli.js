import React, {Component} from 'react';
import { View, Text, BUtton, StyleSheet, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookshop.db');

export default class Troli extends Component {
    state = {
        troli : []
    }

    static navigationOptions = {
        title: 'Troli'
    };

    constructor(){
        super();
        db.transaction(tx=> {
            tx.executeSql('SELECT * FROM troli', null, (_, { rows: { _array } }) => {
                // alert(JSON.stringify(_array));
                this.setState({ troli: _array })
            },
            error => {
                alert(error);
            },
            () => {
            
            });
        });
    }

    render() {
        const {navigation} = this.props;

        return (
            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.troli}
                        renderItem={({item}) => {
                            let subtotal = item.price * item.qty;
                            return (
                                <View style={{marginLeft: 20}}>
                                    <Text style={{fontSize: 20}}>Title = {item.title} </Text>
                                    <Text style={{fontSize: 20}}>Price = {item.price} </Text>
                                    <Text style={{fontSize: 20}}>Qty = {item.qty}</Text>
                                    <Text style={{fontSize: 20}}>Subtotal = {item.subtotal} </Text>
                                    <Text>-----------------------------------------------------------------</Text>
                                </View>
                            );
                        }}
                        keyExtractor={item => item.isbn13}/>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal:16,
    },
    title: {
        fontSize: 30,
    }
});