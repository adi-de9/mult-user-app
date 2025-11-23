import { logoutUser, switchUser } from "@/src/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/provider";
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
  const { users, currentUser } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    setProfileMenuVisible(false);
    dispatch(logoutUser());
    router.push("/(auth)/sign-in");
  };

  return (
    <Modal
      visible={profileMenuVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setProfileMenuVisible(false)}
    >
      <View className="flex-1 bg-black/40 justify-center items-center px-8">
        <View className="bg-white w-full rounded-3xl p-6 shadow-xl">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Profile
          </Text>

          {/* Switch Account */}
          <Text className="text-gray-700 text-base">Switch Account</Text>
          <View className="mt-2 bg-gray-50 rounded-xl overflow-hidden">
            {users
              .filter((u) => u.username !== currentUser)
              .map((user) => (
                <TouchableOpacity
                  key={user.username}
                  className="flex-row items-center gap-3 px-4 py-3 border-b border-gray-200"
                  onPress={async () => {
                    setProfileMenuVisible(false);

                    try {
                      await dispatch(switchUser(user.username)).unwrap();
                      router.replace("/");
                    } catch (err) {
                      if (err === "RE_AUTH_REQUIRED") {
                        router.push({
                          pathname: "/(auth)/sign-in",
                          params: { username: user.username },
                        });
                      }
                    }
                  }}
                >
                  {/* Avatar */}
                  <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center">
                    <Text className="text-gray-700 font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  {/* Username */}
                  <Text className="text-gray-800 text-lg">{user.username}</Text>
                </TouchableOpacity>
              ))}
          </View>

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
