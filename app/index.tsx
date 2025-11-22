import EmptyNotes from "@/components/home/empty-notes";
import HomeHeader from "@/components/home/home-header";
import NotesCard from "@/components/home/note-card";
import ProfileModal from "@/components/home/profile-modal";
import SortModel from "@/components/home/sort-model";
import { restoreSession } from "@/src/redux/authSlice";
import { loadNotes } from "@/src/redux/notesSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRootNavigationState, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const navReady = useRootNavigationState();

  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<
    "updated_desc" | "updated_asc" | "title_asc" | "title_desc"
  >("updated_desc");
  const [sortModal, setSortModal] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const { currentUser, isLoggedIn } = useAppSelector((s) => s.auth);
  const { notes } = useAppSelector((s) => s.notes);

  if (!navReady?.key) return null;

  useEffect(() => {
    const userFetch = async () => {
      const res = await dispatch(restoreSession());

      if (!restoreSession.fulfilled.match(res)) return;

      if (!res.payload.currentUser) {
        Alert.alert("You are not logged in", "Please sign in to continue.", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sign In",
            onPress: () => router.replace("/(auth)/sign-in"),
          },
        ]);
      }
    };
    userFetch();
  }, []);

  useEffect(() => {
    if (currentUser) dispatch(loadNotes(currentUser));
  }, [currentUser]);

  const getAllKeys = async () => {
    const keys = await AsyncStorage.getItem("currentUser");
    const keys2 = await AsyncStorage.getItem("users");
    console.log(keys, "keykey", keys2);
  };
  getAllKeys();

  const onRefresh = async () => {
    setRefreshing(true);
    if (currentUser) await dispatch(loadNotes(currentUser));
    setRefreshing(false);
  };

  // 🔍 SEARCH + SORT (combined)
  const filteredNotes = useMemo(() => {
    const s = search.toLowerCase();

    let result = notes.filter(
      (n) =>
        n.title.toLowerCase().includes(s) || n.content.toLowerCase().includes(s)
    );

    switch (sortOption) {
      case "updated_desc":
        result = result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;

      case "updated_asc":
        result = result.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
        break;

      case "title_asc":
        result = result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "title_desc":
        result = result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [notes, search, sortOption]);

  return (
    <>
      <LinearGradient
        colors={["#f0f9ff", "#e0f2fe", "#ffffff"]}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          {/* HEADER */}
          <HomeHeader
            setSortModal={setSortModal}
            onRefresh={onRefresh}
            notes={notes}
            setProfileMenuVisible={setProfileMenuVisible}
            search={search}
            setSearch={setSearch}
          />

          {/* NOTES LIST */}
          <View className="flex-1 px-6 pt-4">
            <FlatList
              data={filteredNotes}
              renderItem={({ item }) => <NotesCard item={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyNotes />}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#06b6d4"]}
                />
              }
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </SafeAreaView>

        {/* SORT MODAL */}
        <SortModel
          sortModal={sortModal}
          setSortModal={setSortModal}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </LinearGradient>

      {/* PROFILE MENU MODAL */}
      <ProfileModal
        profileMenuVisible={profileMenuVisible}
        setProfileMenuVisible={setProfileMenuVisible}
      />
    </>
  );
}
