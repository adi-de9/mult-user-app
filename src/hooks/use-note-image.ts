// useNoteImage.ts
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export function useNoteImage(initialImage: string | null) {
  const [image, setImage] = useState<string | null>(initialImage);

  // Save to persistent folder
  const saveImageToStorage = async (uri: string) => {
    try {
      const folder = FileSystem.documentDirectory + "note_images/";
      const folderInfo = await FileSystem.getInfoAsync(folder);

      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
      }

      const filename = `img_${Date.now()}.jpg`;
      const dest = folder + filename;

      await FileSystem.copyAsync({ from: uri, to: dest });
      setImage(dest);
      return dest;
    } catch (err) {
      console.error("Failed to save image:", err);
      Alert.alert("Save failed", "Could not save image to storage.");
      return null;
    }
  };

  // Choose from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: "images",
    });

    if (result.canceled) return null;

    return saveImageToStorage(result.assets[0].uri);
  };

  // Take a photo
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow camera access.");
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: "images",
    });

    if (result.canceled) return null;

    return saveImageToStorage(result.assets[0].uri);
  };

  const deleteImage = async () => {
    try {
      if (image) {
        await FileSystem.deleteAsync(image, { idempotent: true });
      }
      setImage(null);
    } catch (err) {
      console.error("Failed to delete image:", err);
      Alert.alert("Delete failed", "Could not delete image.");
    }
  };

  return {
    image,
    setImage,
    pickImage,
    takePhoto,
    deleteImage,
  };
}
