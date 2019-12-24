import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
  //Card
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

class Card extends Component {
  render() {
    return <Text>{this.props.title}</Text>;
  }
}

export default class weather extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     Text: "",
                     cities: "",
                     name: ""
                   };
                 }

                 async listclicked(name) {
                   this.setState({ text: name });
                   await AsyncStorage.setItem(
                     "mericity",
                     this.state.text
                   );                   
                 }

                 buttonclick() {                   
                   this.props.navigation.navigate(
                     "Display",
                     { city: this.state.text }
                   );
                  
                 }

                 getCities(text) {                   
                   this.setState({
                     text
                   });

                   fetch(
                     `http://autocomplete.wunderground.com/aq?query=${text}`
                   )
                     .then(data => data.json())
                     .then(res => {
                       console.log(res);
                       this.setState({
                         cities: res.RESULTS.slice(0,4)
                       });
                     });
                 }

                 render() {
                   renderItem = 
                     <View>
                       <Card title="no cities" />
                     </View>                   
                  if (this.state.cities.length > 0) 
                  {
                     renderItem = this.state.cities.map(city => {
                       return (
                         <TouchableOpacity
                           onPress={() => {
                             this.listclicked(city.name);
                           }}
                           style={styles.citiesbox}
                         >
                           <Card title={city.name} />
                         </TouchableOpacity>
                       )
                     })
                   } 
                    
                   return (
                     <View style={styles.container}>
                       <View style={styles.textbox1}>
                         <TextInput
                           style={styles.textbox}
                           placeholder="Enter City Name"
                           autoCapitalize="none"
                           keyboardType="name"
                           autoCorrect={false}
                           placeholderTextColor="gray"
                           secureTextEntry={false}
                           //   selectTextOnFocus={true}
                           maxLength={100}
                           selectionColor="yellow"
                           //   clearButtonMode="always"
                           //   clearTextOnFocus={true}
                           onChangeText={text => this.getCities(text)}
                           value={this.state.text}
                         />
                       </View>
                       <TouchableOpacity
                         onPress={() => this.buttonclick()}
                         style={{
                           width: "80%",
                           height: "7%",
                           backgroundColor: "green",
                           justifyContent: "center",
                           alignItems: "center",
                           marginHorizontal: 50,
                           position: "absolute",
                           marginTop: 150,
                           borderRadius: 20
                         }}
                       >
                         <ScrollView>{renderItem}</ScrollView>
                         <Text
                           style={{
                             color: "white",
                             fontWeight: "bold",
                             fontSize: 20
                           }}
                         >
                           click for Report
                         </Text>
                       </TouchableOpacity>
                       
                     </View>
                   );
                 }
               }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    color: "white",
    padding: 10,     
  },

  textbox1: {
    borderWidth: 2,
    borderColor: "lightblue",
    padding: 10,
    borderRadius: 50,
    marginTop: 50,
    backgroundColor: "#f5deb3"
  },

  textbox: {
    // borderBottomWidth:2,
    // borderBottomColor:'#a9a9a9',
    padding: 1,
    color: "#808080",
    fontSize: 16,
    fontWeight: "bold",    
  },
  citiesbox: {
    padding: 10,
    backgroundColor: "#b0e0e6",
    marginTop: 4,
    borderRadius: 10
  }
});
