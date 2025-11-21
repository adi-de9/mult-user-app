import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
{
  /* NOTES EMPTY CHECK */
}
const EmptyNotes = () => {
  const router = useRouter();

  return (
    <View
      className="items-center justify-center px-8"
      style={{ marginTop: 100 }}
    >
      <View className="bg-cyan-100 rounded-full p-8 mb-6">
        <Ionicons name="document-text-outline" size={80} color="#06b6d4" />
      </View>
      <Text className="text-gray-800 text-2xl font-bold text-center mb-3">
        No Notes Yet
      </Text>
      <Text className="text-gray-500 text-center text-base mb-8">
        Tap + to create your first note.
      </Text>

      <TouchableOpacity
        className="bg-cyan-500 rounded-2xl px-8 py-4 flex-row items-center"
        onPress={() => router.push("/note/new")}
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text className="text-white font-bold text-lg ml-2">Create Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyNotes;
