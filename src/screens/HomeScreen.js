import React, { useContext } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NoteContext } from "../data/store/NoteContext";
import { formatDistanceToNow, format } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen({ navigation }) {
  const context = useContext(NoteContext);
  const { notes, labels } = context;
  // Sort notes by time (updatedAt)
  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  const getLabelName = (id) => {
    const label = labels.find((label) => label.id === id);
    return label ? label.label : "";
  };

  const timeDisplay = (time) => {
    const updatedAt = new Date(time);
    const now = new Date();

    // Check if updatedAt and now are on the same day
    const isSameDay =
      updatedAt.getDate() === now.getDate() &&
      updatedAt.getMonth() === now.getMonth() &&
      updatedAt.getFullYear() === now.getFullYear();

    const displayText = isSameDay
      ? formatDistanceToNow(updatedAt, { addSuffix: true })
      : format(updatedAt, "MMMM d, yyyy");
    return displayText;
  };

  const handleEditNote = (id) => {
    navigation.navigate("EditNote", { id });
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          Notes
        </Text>
        <TouchableOpacity>
          <Ionicons name="search" size={28} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {notes.length === 0 ? (
          <Text>Please add a new note</Text>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "#86c7fc",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </Text>
            <FlatList
              data={sortedNotes}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      marginVertical: 10,
                      backgroundColor: "white",
                      elevation: 2,
                      borderRadius: 2,
                    }}
                    onPress={() => handleEditNote(item.id)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 5,
                      }}
                    >
                      {item.color && (
                        <View
                          style={{
                            backgroundColor: item.color,
                            padding: 5,
                            borderRadius: 5,
                            marginRight: 5,
                          }}
                        />
                      )}
                      <Text
                        style={{
                          flex: 1,
                        }}
                      >
                        {timeDisplay(item.updatedAt)}
                      </Text>
                      {item.isBookmarked && (
                        <Ionicons
                          name="bookmark"
                          size={24}
                          color={item.color}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 5,
                      }}
                    >
                      {item.labelIds?.map((labelId) => (
                        <View
                          key={labelId}
                          style={{
                            backgroundColor: "#f0f0f0",
                            marginRight: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: "#ababab",
                              paddingHorizontal: 5,
                            }}
                          >
                            {getLabelName(labelId)}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <Text>{item.content}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
        }}
        onPress={() => navigation.navigate("NewNote")}
      >
        <Ionicons name="add-circle" size={50} color={"lightgreen"} />
      </TouchableOpacity>
    </View>
  );
}
