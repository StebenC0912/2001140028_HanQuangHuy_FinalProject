import React, { useContext } from "react";
import { View, Text } from "react-native";
import { NoteContext } from "../data/store/NoteContext";

const EditNote = ({ navigation, route }) => {
  const context = useContext(NoteContext);
  const { notes } = context;
  const data = notes.find((note) => note.id === route.params.id);
  console.log(data);
  return (
    <View>
        
    </View>
  );
};

export default EditNote;
