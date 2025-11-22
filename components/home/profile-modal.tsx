import { logoutUser } from "@/src/redux/authSlice";
import { useAppDispatch } from "@/src/redux/provider";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface TypesProfileModal {
  profileMenuVisible: boolean;
  setProfileMenuVisible: (value: boolean) => void;
}

const ProfileModal = ({
  profileMenuVisible,
  setProfileMenuVisible,
}: TypesProfileModal) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    setProfileMenuVisible(false);
    dispatch(logoutUser());
  };

  return (
    <Modal
      visible={profileMenuVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setProfileMenuVisible(false)}
    >
      <View className="flex-1 bg-black/40 justify-center items-center px-10">
        <View className="bg-white w-full rounded-2xl p-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">Profile</Text>

          {/* Switch Account */}
          <TouchableOpacity
            className="py-4 border-b border-gray-200"
            onPress={() => {
              setProfileMenuVisible(false);
              dispatch(logoutUser()); // Clear auth
              router.replace("/(auth)/sign-in"); // Go to login screen
            }}
          >
            <Text className="text-gray-700 text-base">Switch Account</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity className="py-4" onPress={handleLogout}>
            <Text className="text-red-600 text-base font-semibold">Logout</Text>
          </TouchableOpacity>

          {/* Close */}
          <TouchableOpacity
            className="bg-gray-200 rounded-xl py-3 mt-4"
            onPress={() => setProfileMenuVisible(false)}
          >
            <Text className="text-center text-gray-700 font-semibold">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileModal;
