//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Display extends Component {
      constructor(props){
          super(props);
          this.state = {
            name:'',
            main:{
            temp: '',
            pressure: '',
            humidity: '',
            temp_min: '',
            temp_max: ''
            }
          };
        }

        componentDidMount(){
            const { navigation } = this.props;
            const text = navigation.getParam("city");             
                 fetch(
                   `http://autocomplete.wunderground.com/aq?query=${text}`
                 )
                   .then(data => data.json())
                   .then(res => {
                     console.log(res);
                     this.setState({
                       name: res.RESULTS[0].name,
                       main:{
                       temp: res.RESULTS[0].zmw,
                       pressure: res.RESULTS[0].tz,
                       humidity: res.RESULTS[0].l,
                       temp_min: res.RESULTS[0].ll,
                       temp_max: res.RESULTS[0].lat,
                      } });
                   });
        }
      
    render(){
        return (
          <View style={styles.container}>
            <View style={styles.myWeb}>
              <Text style={{ fontSize: 28, marginBottom: 20 }}>
                Your City Weather
              </Text>              
              <Text style={{ fontSize: 28, marginBottom: 20 }}>
               {this.state.name}
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>
                {this.state.main.temp}
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>
                {this.state.main.pressure}
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>
                {this.state.main.humidity}
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>
                {this.state.main.temp_min}
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>
                {this.state.main.temp_max}
              </Text>
            </View>
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87cefa'
  },
  myWeb: {    
    alignItems: 'center',    
    width:'100%',
    height:'100%',
    paddingVertical:20,
  }
});

//make this component available to the app
export default Display;
