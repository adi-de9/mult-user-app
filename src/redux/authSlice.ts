import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
  pin: string; // 4-digit code
}

interface AuthState {
  users: User[];
  isLoggedIn: boolean;
  currentUser: string | null;
  loading: boolean;
  error: string | null;
}

// Restore stored users + current login session
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async () => {
    const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");
    const currentUser = await AsyncStorage.getItem("currentUser");
    return {
      users,
      currentUser,
      isLoggedIn: !!currentUser,
    };
  }
);

// SIGN UP
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ username, password, pin }: User) => {
    const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");

    if (users.find((u: User) => u.username === username)) {
      throw new Error("Username already exists");
    }

    const newUsers = [...users, { username, password, pin }];
    await AsyncStorage.setItem("users", JSON.stringify(newUsers));

    return newUsers;
  }
);

// LOGIN via password OR pin
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, pin }: any) => {
    const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");

    const user = users.find(
      (u: any) =>
        u.username === username && (u.password === password || u.pin === pin)
    );

    if (!user) throw new Error("Invalid credentials");

    await AsyncStorage.setItem("currentUser", username);

    return username;
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await AsyncStorage.removeItem("currentUser");
  return true;
});


const initialState: AuthState = {
  users: [],
  isLoggedIn: !!AsyncStorage.getItem("currentUser"),
  currentUser: null,
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.currentUser = action.payload.currentUser;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;
