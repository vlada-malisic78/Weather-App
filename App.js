import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  KeyboardAvoidingView, 
  ActivityIndicator, 
  StatusBar,
  Platform
} from 'react-native';

import SearchInput from './components/SearchInput'

import {fetchLocationId, fetchWeather } from './utils/api';

import getImageForWeather from './utils/getImageForWeather';

class App extends React.Component {
  state ={
    location:'',
    loading: false,
    error:false,
    temperature: 0,
    weather:''
  }
  
componentDidMount(){
  this.setState({weather: 'Clear'}, ()=>console.log(this.state)
      )}


handleUpdateLocation = async city => {
  if(!city) return;

  this.setState({
    loading: true
  }, async () => {
    try {
      const locationId = await fetchLocationId(city);
      const {location, weather, temperature} = await fetchWeather(locationId)

      this.setState({
        loading: false,
        error: false,
        location,
        weather,
        temperature
      })
    }
    catch(e){
      this.setState({
        loading: false,
        error: true
      })
    }
  })
}
  render(){
    const {location, loading, error, weather, temperature} = this.state;
   return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground 
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >   
        <View style={styles.detailsContainer}>
           <ActivityIndicator animating={loading} color="white" size="large" />   
          {!loading && (
          <View>
            {error && (
              <Text style={[styles.smallText, styles.textStyle]}>
               Could not load weather, please try a different city
              </Text>
            )}

            {!error && (
              <View>
                 <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
            <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                 <Text style={[styles.largeText, styles.textStyle]}>
                     {`${Math.round(temperature)}`}
                 </Text>
              </View>
            )}

          <SearchInput placeholder="Search any city" onSubmit = {this.handleUpdateLocation} />
        </View>
          )}
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  largeText:{
    fontSize:47
  },
  textStyle:{
    color: 'white',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios'? 'AvenirNext-Regular': 'Roboto'
  },  
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }
});


export default App;