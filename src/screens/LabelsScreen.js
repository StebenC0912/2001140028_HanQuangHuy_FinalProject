import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NoteContext } from "../data/store/NoteContext";

export default function LabelsScreen({ navigation }) {
  const context = useContext(NoteContext);
  const { labels, addLabel } = context;

  const [searchText, setSearchText] = useState("");
  const [filteredLabels, setFilteredLabels] = useState(labels);
  const searchRef = useRef(null);

  const handleSearch = useCallback(
    (text) => {
      if (text) {
        const filtered = labels.filter((label) =>
          label.label.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredLabels(filtered);
      } else {
        setFilteredLabels(labels);
      }
    },
    [labels]
  );

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText, handleSearch]);

  const handleCreateLabel = () => {
    if (searchText.trim()) {
      addLabel({ label: searchText.trim() });
      Alert.alert("Success", "Label created successfully.");
    } else {
      Alert.alert("Error", "Label name cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search labels or create new label"
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        ref={searchRef}
      />
      <View
        style={{
          paddingHorizontal: 15,
          marginVertical: 10,
        }}
      >
        <Text>{labels.length} total</Text>
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={handleCreateLabel}
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "blue",
                fontSize: 16,
              }}
            >
              +Add new label
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredLabels.length > 0 ? (
        <FlatList
          data={filteredLabels}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.labelList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.labelItem}>
              <Text style={styles.labelText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No labels found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    fontSize: 16,
  },
  labelList: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  labelItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "blue",
  },
  labelText: {
    textAlign: "center",
    margin: 10,
    fontSize: 16,
    color: "lightblue",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
