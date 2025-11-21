import { useAppSelector } from "@/src/redux/provider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TypesHeader {
  setSortModal: (value: boolean) => void;
  setProfileMenuVisible: (value: boolean) => void;
  onRefresh: () => void;
  notes: any[];
}

const HomeHeader = ({
  setSortModal,
  setProfileMenuVisible,
  onRefresh,
  notes,
}: TypesHeader) => {
  const router = useRouter();
  const { currentUser } = useAppSelector((s) => s.auth);

  return (
    <View
      className="px-6 pt-14 pb-6"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-1">
          <Text className="text-gray-500 text-sm font-medium">
            Welcome back,
          </Text>
          <Text className="text-gray-900 text-3xl font-bold mt-1">
            {currentUser}
          </Text>
        </View>

        {/* 🔵 Add Note Button */}
        <TouchableOpacity
          className="bg-cyan-500 rounded-2xl p-4 mr-3"
          onPress={() => router.push("/note/new")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={26} color="white" />
        </TouchableOpacity>

        {/* 👤 Profile Icon */}
        <TouchableOpacity
          className="bg-white rounded-full p-3"
          onPress={() => setProfileMenuVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="person-circle-outline" size={30} color="#06b6d4" />
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View className="flex-row items-center mt-4 bg-white/70 rounded-2xl p-4">
        <View className="flex-row items-center flex-1">
          <Ionicons name="documents-outline" size={20} color="#06b6d4" />
          <Text className="text-gray-700 font-semibold ml-2">
            {notes.length} {notes.length === 1 ? "Note" : "Notes"}
          </Text>
        </View>

        {notes.length > 0 && (
          <View className="flex-row items-center">
            {/* Sort Button */}
            <TouchableOpacity
              onPress={() => setSortModal(true)}
              className="flex-row items-center mr-4"
            >
              <Ionicons name="swap-vertical" size={18} color="#06b6d4" />
            </TouchableOpacity>

            {/* Refresh Button */}
            <TouchableOpacity
              onPress={onRefresh}
              className="flex-row items-center"
            >
              <Ionicons name="refresh" size={18} color="#06b6d4" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeHeader;
