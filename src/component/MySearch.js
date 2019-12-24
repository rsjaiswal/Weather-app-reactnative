import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Button} from 'react-native';
const { width } = Dimensions.get("window");

class Card extends Component{
  render(){
    return(
      <View>
        <Text>{this.props.title}</Text>
      </View>
    )
  }
}

// create a component
class MySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      cities: '',
    };
  }

  getValue(text) {
    console.log(text);
    this.setState({ text });
    fetch(
      `http://autocomplete.wunderground.com/aq?query=${text}`
    )
      .then(data => data.json())
      .then(res => {
        console.log(res);
        this.setState({
          cities: res.RESULTS.slice(0, 4)
        });
      }).catch((error) => {
        console.error(error);
      });
  }

  buttonClick(){
    console.log('text'); 
  }

  render() {
    const { boxs, myInput } = styles;
    const renderItem = <View><Card title="no title"/>
    </View>
    if(this.state.text.length > 0){
     renderItem = this.state.cities.map((item)=>{
        return (<TouchableOpacity style={{ borderWidth:2, borderColor:'blue', borderRadius:5, marginBottom:2}}>
         <Card title={item.name}/>
        </TouchableOpacity>
      );
    })
  }

  
     
    return (
      <View style={styles.container}>
        <View style={boxs}>
          <Text
            style={{
              fontSize: 22,
              marginBottom: 10,
              fontWeight: "bold",
              color: "#202325",
            }}
          >
            Please input city name
          </Text>
          <TextInput
            value={this.state.text}
            style={myInput}
            onChangeText={text => this.getValue(text)}
          />         
          <Button
            onPress={this.buttonClick}
            title="Click Me"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Text>{renderItem}</Text>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,       
        alignItems: 'center',        
    },
   boxs:{
       marginTop: 2, 
       paddingVertical:40,      
   },
   myInput:{
      width: width * 0.9,
      height:width * 0.1,
      borderWidth:2,
      borderColor:'#006699',
      borderRadius:10,
      marginBottom:10,
   },

});

//make this component available to the app
export default MySearch;
