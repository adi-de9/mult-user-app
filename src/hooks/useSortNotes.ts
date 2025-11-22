import { useMemo } from "react";
import { Note } from "../types/note";

type SortOption = "updated_desc" | "updated_asc" | "title_asc" | "title_desc";

export const useSortNotes = (notes: Note[], sortOption: SortOption) => {
  return useMemo(() => {
    if (!notes.length) return [];

    // Create a new array to avoid mutating the original
    const sortedNotes = [...notes];

    switch (sortOption) {
      case "updated_desc":
        return sortedNotes.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      case "updated_asc":
        return sortedNotes.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );

      case "title_asc":
        return sortedNotes.sort((a, b) => a.title.localeCompare(b.title));

      case "title_desc":
        return sortedNotes.sort((a, b) => b.title.localeCompare(a.title));

      default:
        return sortedNotes;
    }
  }, [notes, sortOption]);
};
