import { useAppSelector } from "@/src/redux/provider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface TypesHeader {
  setSortModal: (value: boolean) => void;
  setProfileMenuVisible: (value: boolean) => void;
  onRefresh: () => void;
  notes: any[];
  search: string;
  setSearch: (value: string) => void;
}

const HomeHeader = ({
  setSortModal,
  setProfileMenuVisible,
  onRefresh,
  notes,
  search,
  setSearch,
}: TypesHeader) => {
  const router = useRouter();
  const { currentUser } = useAppSelector((s) => s.auth);

  return (
    <View
      className="px-5 pt-12 pb-2 bg-gradient-to-b from-gray-50 to-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      {/* Welcome Section with Actions */}
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-1 mr-3">
          <Text className="text-gray-500 text-lg font-medium">
            Welcome back,
          </Text>
          <Text
            className="text-gray-900 text-2xl font-bold mt-0.5 capitalize"
            numberOfLines={1}
          >
            {currentUser}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row items-center gap-x-2">
          {/* Add Note Button */}
          <TouchableOpacity
            className="bg-cyan-500 rounded-2xl p-3.5"
            onPress={() => router.push("/note/new")}
            activeOpacity={0.8}
            style={{
              shadowColor: "#06b6d4",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>

          {/* Profile Icon */}
          <TouchableOpacity
            className="bg-white rounded-full p-3"
            onPress={() => setProfileMenuVisible(true)}
            activeOpacity={0.8}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="person-circle-outline" size={26} color="#06b6d4" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search, Sort, and Notes Count Row */}

      <View
        className="flex-row items-center bg-white rounded-2xl p-3"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        {/* Search Bar */}
        <View className="flex-row items-center flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 mr-3">
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            className="flex-1 text-base text-gray-800 ml-2"
            placeholder="Search notes..."
            placeholderTextColor="#94a3b8"
            onChangeText={setSearch}
            value={search}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Sort Button */}
        <TouchableOpacity
          onPress={() => setSortModal(true)}
          className="bg-gray-50 rounded-xl p-2.5 mr-3"
          activeOpacity={0.7}
        >
          <Ionicons name="swap-vertical" size={20} color="#06b6d4" />
        </TouchableOpacity>

        {/* Notes Count */}
        <View className="flex-row items-center">
          <View className="bg-cyan-50 rounded-full p-2 mr-2">
            <Ionicons name="documents-outline" size={18} color="#06b6d4" />
          </View>
          <View>
            <Text className="text-gray-900 font-bold text-base">
              {notes.length}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
