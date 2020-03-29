import React, { Component } from 'react';

import {StyleSheet, TextInput, View} from 'react-native';

class SearchInput extends Component {

    state ={
        text:''
    }

    handleChangeText = event =>{
       this.setState({
           text:event
       })
    }

    handleSubmitEditing = () => {
        const {onSubmit} = this.props;
        const {text} = this.state;

        if(!text){
            return;
        }
        
        onSubmit(text);
        this.setState({text: ''})
    }


    render() { 
        const {text}=this.state;
        const {placeholder}= this.props;

        return ( 
            <View style={stil.container}>
                <TextInput
                    autoCorrect={false}
                    placeholder={placeholder}
                    placeholderTextColor="white"
                    value={text}
                    underlineColorAndroid="transparent"
                    style={stil.textInput}
                    clearButtonMode="always"
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing}
                />
            </View>
         );
    }
}
const stil = StyleSheet.create({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textInput: {
        color: 'white',
        flex:1
    }
})

export default SearchInput;