import { hash } from "@/utils/hash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
  pin: string; // 4-digit code
  isAuth?: boolean;
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
      isAuth: true,
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

    const hashedPassword = await hash(password);
    const hashedPin = await hash(pin);

    const newUser = {
      username,
      password: hashedPassword,
      pin: hashedPin,
      isAuth: false,
    };

    const newUsers = [...users, newUser];
    await AsyncStorage.setItem("users", JSON.stringify(newUsers));

    return newUsers;
  }
);

// LOGIN via password OR pin
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, pin }: any) => {
    const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");

    const user = users.find((u: User) => u.username === username);

    if (!user) throw new Error("User not found");

    const finalInput = password === "" ? pin : password;
    const hashInput = await hash(finalInput);

    if (user.password !== hashInput && user.pin !== hashInput) {
      throw new Error("Invalid credentials");
    }

    // Mark this user as authenticated for the future
    const updatedUsers = users.map((u: User) =>
      u.username === username ? { ...u, isAuth: true } : u
    );

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    await AsyncStorage.setItem("currentUser", username);

    return { username, users: updatedUsers };
  }
);

export const switchUser = createAsyncThunk(
  "auth/switchUser",
  async (username: string, { rejectWithValue }) => {
    const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");

    const targetUser = users.find((u: User) => u.username === username);

    if (!targetUser) {
      return rejectWithValue("User not found");
    }

    if (!targetUser.isAuth) {
      return rejectWithValue("RE_AUTH_REQUIRED");
    }

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
        state.currentUser = action.payload.username;
        state.users = action.payload.users;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.currentUser = null;
      })
      .addCase(switchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
