import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  createdAt: number;
  updatedAt: number;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  currentUser: string | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
  currentUser: null,
};

// Load notes for a specific user
export const loadNotes = createAsyncThunk(
  "notes/loadNotes",
  async (username: string) => {
    const storageKey = `notes_${username}`;
    const data = await AsyncStorage.getItem(storageKey);
    return {
      username,
      notes: data ? JSON.parse(data) : [],
    };
  }
);

// Add or update notes in storage
const saveNotesToStorage = async (username: string, notes: Note[]) => {
  const storageKey = `notes_${username}`;
  await AsyncStorage.setItem(storageKey, JSON.stringify(notes));
};

// Add note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ username, title, content, image }: any) => {
    const storageKey = `notes_${username}`;
    const existing = JSON.parse(
      (await AsyncStorage.getItem(storageKey)) || "[]"
    );

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      image: image || null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updated = [...existing, newNote];
    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));

    return newNote;
  }
);

// Edit note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ username, id, title, content, image }: any) => {
    const storageKey = `notes_${username}`;
    const notes = JSON.parse((await AsyncStorage.getItem(storageKey)) || "[]");

    const updated = notes.map((note: Note) =>
      note.id === id
        ? {
            ...note,
            title,
            content,
            image: image ?? note.image,
            updatedAt: Date.now(),
          }
        : note
    );

    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
    return { id, title, content, image };
  }
);

// Delete note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async ({ username, id }: any) => {
    const storageKey = `notes_${username}`;
    const notes = JSON.parse((await AsyncStorage.getItem(storageKey)) || "[]");

    const updated = notes.filter((note: Note) => note.id !== id);

    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));

    return id;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearNotes: (state) => {
      state.notes = [];
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadNotes.fulfilled, (state, action) => {
        state.notes = action.payload.notes;
        state.currentUser = action.payload.username;
        state.loading = false;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const { id, title, content, image } = action.payload;
        const target = state.notes.find((n: Note) => n.id === id);
        if (target) {
          target.title = title;
          target.content = content;
          target.image = image;
          target.updatedAt = Date.now();
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((n) => n.id !== action.payload);
      });
  },
});

export const { clearNotes } = notesSlice.actions;
export default notesSlice.reducer;
