import React, { useContext, useRef, useState, useMemo, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { NoteContext } from "../data/store/NoteContext";
import { formatDistanceToNow, format } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
const EditNote = ({ navigation, route }) => {
  const context = useContext(NoteContext);
  const { notes, labels } = context;
  const data = notes.find((note) => note.id === route.params.id);
  const [note, setNote] = useState(data.content);
  const contentRef = useRef(null);
  const [isBookmarked, setIsBookmarked] = useState(data.isBookmarked);
  // bottom sheet
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

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
  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => !prev);
    context.editNote(data.id, {
      ...data,
      content: note,
      updatedAt: new Date().toString(),
      isBookmarked: !isBookmarked,
    });
  };

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={1}
				appearsOnIndex={2}
			/>
		),
		[]
	);
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          {data.labelIds?.map((labelId) => (
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

        <TextInput
          placeholder="Update the content here"
          ref={contentRef}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
      </View>

      <View
        style={{
          backgroundColor: "#f0f0f0",
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
          }}
        >
          Edit {timeDisplay(data.updatedAt)}
        </Text>
        <TouchableOpacity onPress={handleBookmarkToggle}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={25}
            color={data.color}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => sheetRef.current?.expand()}>
          <Ionicons
            name="ellipsis-vertical-outline"
            size={25}
            color={data.color}
          />
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        borderRadius={10}
        backdropComponent={renderBackdrop}
        onChange={(index) => console.log("snapped to index:", index)}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "transparent" }}
        enableDismissOnClose={false}
        style={{ borderRadius: 10, borderWidth: 1, borderColor: "gray" }}
      >
        <View style={{ backgroundColor: "white", height: "100%", padding: 10 }}>
          <TouchableOpacity
            onPress={() => {
              context.deleteNote(data.id);
              navigation.goBack();
            }}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default EditNote;
