import { loginUser, restoreSession } from "@/src/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/provider";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, isLoggedIn } = useAppSelector((state) => state.auth);
  const [pin, setPin] = useState("");

  useEffect(() => {
    dispatch(restoreSession());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    if (!username) {
      alert("Username is required");
      return;
    }

    if (!password && !pin) {
      alert("Enter password or 4-digit PIN");
      return;
    }

    const result = await dispatch(
      loginUser({
        username,
        password: password || "",
        pin: pin || "",
      })
    );

    if (loginUser.fulfilled.match(result)) {
      router.replace("/");
    } else {
      alert("Invalid username, password or PIN");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={["#111827", "#1f2937", "#164e63"]}
        start={{ x: 0, y: 5 }}
        end={{ x: 0, y: -1 }}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center p-6 min-h-screen">
            {/* Logo/Header */}
            <View className="mb-8 items-center">
              <View className="bg-white rounded-full p-4 mb-4 shadow-xl">
                <Ionicons name="lock-closed" size={48} color="#06b6d4" />
              </View>
              <Text className="text-white text-4xl font-bold mb-2">
                Welcome
              </Text>
              <Text className="text-cyan-300 text-lg">Sign in to continue</Text>
            </View>

            {/* Login Form */}
            <View className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
              {/* Email Input */}
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2 text-sm">
                  Username
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                  <Ionicons name="mail-outline" size={20} color="#6b7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-800 text-base"
                    placeholder="Enter your username"
                    placeholderTextColor="#9ca3af"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2 text-sm">
                  Password
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#6b7280"
                  />
                  <TextInput
                    className="flex-1 ml-3 text-gray-800 text-base"
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Divider */}
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500 text-sm">OR</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-2 text-sm">
                  4-Digit PIN (optional login)
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#6b7280"
                  />
                  <TextInput
                    className="flex-1 ml-3 text-gray-800 text-base"
                    placeholder="1234"
                    value={pin}
                    keyboardType="number-pad"
                    maxLength={4}
                    onChangeText={setPin}
                  />
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${
                      rememberMe
                        ? "bg-cyan-500 border-cyan-500"
                        : "border-gray-400"
                    }`}
                  >
                    {rememberMe && (
                      <Ionicons name="checkmark" size={14} color="white" />
                    )}
                  </View>
                  <Text className="text-gray-700 text-sm">Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-cyan-500 font-semibold text-sm">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <LinearGradient
                colors={["#06b6d4", "#2563eb"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 12,
                  marginBottom: 24,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  className="py-4 items-center"
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-center font-bold text-lg">
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>

              {/* Sign Up Link */}
              <View className="flex-row justify-center">
                <Text className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/sign-up")}>
                  <Text className="text-cyan-500 font-semibold text-sm">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
