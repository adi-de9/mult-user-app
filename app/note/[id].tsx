// NoteEditor.tsx (quick patch using legacy FileSystem)
import { addNote, Note, updateNote } from "@/src/redux/notesSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/provider";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy"; // <= legacy import
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NoteEditor() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((s) => s.auth);
  const { notes } = useAppSelector((s) => s.notes);

  const isNew = id === "new";
  const existingNote: Note | undefined = notes.find((n) => n.id === id);

  const [title, setTitle] = useState<string>(
    isNew ? "" : existingNote?.title || ""
  );
  const [content, setContent] = useState<string>(
    isNew ? "" : existingNote?.content || ""
  );
  const [image, setImage] = useState<string | null>(
    isNew ? null : existingNote?.image || null
  );
  const insets = useSafeAreaInsets();

  // pick from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      mediaTypes: "images",
    });
    console.log("result", result);
    if (result.canceled) {
      Alert.alert("Permission required", "Please allow photo access.");
      return;
    }
    console.log(result);

    if (!result.canceled) {
      const dest = await saveImageToStorage(result.assets[0].uri);
      if (dest) setImage(dest); // ensures state updates
    }
  };

  // take a photo
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
      mediaTypes: "images",
    });
    console.log("result", result);

    if (!result.canceled) {
      await saveImageToStorage(result.assets[0].uri);
    }
  };

  // copy into documentDirectory so it persists across app restarts
  const saveImageToStorage = async (uri: string) => {
    try {
      // Make sure folder exists
      const folder = FileSystem.documentDirectory + "note_images/";
      console.log("folder", folder);
      const folderInfo = await FileSystem.getInfoAsync(folder);
      console.log("folderInfo", folderInfo);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
      }

      // Always generate unique filename
      const filename = `img_${Date.now()}.jpg`;
      console.log("filename", filename);
      const dest = folder + filename;
      console.log("dest", dest);

      await FileSystem.copyAsync({ from: uri, to: dest });

      setImage(dest);
      return dest;
    } catch (err) {
      console.error("Failed to save image:", err);
      Alert.alert("Save failed", "Could not save image to storage.");
    }
  };
  console.log(image);
  

  const saveNote = async () => {
    if (!currentUser) return;
    if (isNew) {
      await dispatch(addNote({ username: currentUser, title, content, image }));
    } else {
      await dispatch(
        updateNote({ username: currentUser, id, title, content, image })
      );
    }
    router.back();
  };

  return (
    <LinearGradient
      colors={["#f0f9ff", "#e0f2fe", "#ffffff"]}
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
      }}
    >
      <StatusBar style="dark" translucent />
      <TextInput
        style={{
          color: "black",
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 12,
        }}
        placeholder="Title"
        placeholderTextColor="#64748b"
        value={title}
        onChangeText={setTitle}
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />
      )}

      <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "#06b6d4",
            padding: 12,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="images-outline" size={18} color="white" />
          <Text style={{ color: "white", marginLeft: 8 }}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={takePhoto}
          style={{
            backgroundColor: "#06b6d4",
            padding: 12,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="camera-outline" size={18} color="white" />
          <Text style={{ color: "white", marginLeft: 8 }}>Camera</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={{
          color: "black",
          fontSize: 16,
          flex: 1,
          textAlignVertical: "top",
        }}
        placeholder="Write your note..."
        placeholderTextColor="#64748b"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity
        onPress={saveNote}
        style={{
          backgroundColor: "#06b6d4",
          padding: 14,
          borderRadius: 12,
          marginTop: 12,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "700" }}
        >
          Save Note
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
