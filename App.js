// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, StatusBar, View, TextInput, Button, ScrollView, Alert} from 'react-native';

export default function App() {

  const Separator = () => <View style={styles.separator} />;
  const ButtonSeparation = () => <View style={styles.button_separation} />;

  const [outcome, enteredOutcome] = useState(""); // used to capture entered text in the input text                                   

  const [textList, setTextList] = useState([]); // array that stores all the outcomes that the user has entered

  
  const enable = (index) => { // function to change the text on the button to enable visibility
    const updatedTextList = [...textList];
    updatedTextList[index].enabled = !updatedTextList[index].enabled; // used to enable and disable the visiblility of the outcomes visible to student 
    setTextList(updatedTextList);
  };

  const addText = () => { // fuction that adds the text to be reviewed and also adds the buttons to delete, enable or disable the outcome to students
    const newText = outcome;  
    if (newText !== ""){
      const add = {text: newText, enabled: false};
      setTextList([...textList, add]);
      enteredOutcome("");
    }
    enteredOutcome("");
  };

  const deleteText = (index) => {
    const prevTextList = [...textList];
    prevTextList.splice(index, 1);
    setTextList(prevTextList);
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style = {styles.scroll}>


        <Text>Enter outcomes </Text>

        {textList.map((text, index) => (
          <View style = {styles.new_view}>
            <View >
              <Button
                title = {text.enabled ? 'Disable' : 'Enable'}
                onPress= {() => enable(index)}
              />

              <ButtonSeparation/>

              <Button
                title = "delete"
                onPress= {() => deleteText(index)}
              />
            </View>
            <Text key={index} style = {styles.added_text}>{text.text}</Text>
          </View>
        ))}

        <Separator/>

        <View style = {styles.input_view}>
          <TextInput
            style = {styles.input_style}
            onChangeText = {(value_) => enteredOutcome(value_)}
            value= {outcome} // Set the input value to the outcome state
            placeholder= {outcome ? '' : "e.g Understanding of matrix multiplication"}
            multiline
          />

          <ButtonSeparation/>

          <Button
            title = "add"
            color= "red"
            onPress= {addText}
          />
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}


//styles
//------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal : 20,
    paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // alignItems: "flex-end",
    // justifyContent: 'center',
  },

  input_style : {
    // flex: 1,
    backgroundColor : "lightblue",
    borderColor: "black",
    borderRadius: 5,
    paddingStart: 10,
    height: 50,
    width: "100%",
    borderWidth: 2,
    alignSelf: "flex-start",
    // textAlign: "center",
  },

  scroll : {
    flex: 1,
    color: "red",
    paddingBottom: 20,
    // alignSelf: "flex-end",
  },

  new_view: {
    flexDirection: "row-reverse",
    marginVertical: 5,
    padding: 5,
    backgroundColor: "silver",
  },
  
  added_text: {
    flex : 1,
    alignSelf: "flex-start",
    fontSize: 20,
    // paddingTop: 10,
  },
  input_view : {
    flex : 1,
    alignItems: "flex-end",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button_separation : {
    marginVertical: 4,
  },

});
