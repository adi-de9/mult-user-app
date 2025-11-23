import { deleteNote } from "@/src/redux/notesSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/provider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

// Single Todo Card
const NotesCard = ({ item }: any) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { currentUser } = useAppSelector((s) => s.auth);

  //Delete Todo
  const handleDelete = (id: string, title: string) => {
    Alert.alert("Delete Note", `Delete "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(deleteNote({ username: currentUser, id })),
      },
    ]);
  };

  //Truncate Text
  const truncateText = (text: string, maxLength = 100) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/note/${item.id}`)}
    >
      <View
        className="bg-white rounded-2xl mb-4 overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        {item.image && (
          <Image
            source={{ uri: item.image }}
            className="w-full h-48"
            resizeMode="cover"
          />
        )}

        <View className="p-4">
          <View className="flex-row items-start justify-between mb-2">
            <Text
              className="text-gray-900 text-xl font-bold flex-1 mr-2"
              numberOfLines={2}
            >
              {item.title || "Untitled Note"}
            </Text>

            <TouchableOpacity
              onPress={() => handleDelete(item.id, item.title)}
              className="bg-red-50 rounded-full p-2"
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>

          {item.content && (
            <Text className="text-gray-600 text-sm leading-5" numberOfLines={3}>
              {truncateText(item.content)}
            </Text>
          )}

          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={14} color="#9ca3af" />
              <Text className="text-gray-400 text-xs ml-1">
                {new Date(item.updatedAt).toLocaleDateString()}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={16} color="#06b6d4" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotesCard;
