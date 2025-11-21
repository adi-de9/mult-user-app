import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type SortOption = "updated_desc" | "updated_asc" | "title_asc" | "title_desc";

interface TypesSortModel {
  sortModal: boolean;
  setSortModal: (value: boolean) => void;
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
}

const SortModel = ({
  sortModal,
  setSortModal,
  sortOption,
  setSortOption,
}: TypesSortModel) => {
  return (
    <Modal transparent visible={sortModal} animationType="fade">
      <View className="flex-1 bg-black/30 items-center justify-center px-10">
        <View className="bg-white rounded-2xl p-6 w-full">
          <Text className="text-gray-900 text-xl font-bold mb-4">Sort By</Text>

          {[
            {
              label: "Last Updated (Newest → Oldest)",
              value: "updated_desc",
            },
            {
              label: "Last Updated (Oldest → Newest)",
              value: "updated_asc",
            },
            { label: "Title (A → Z)", value: "title_asc" },
            { label: "Title (Z → A)", value: "title_desc" },
          ].map((opt) => (
            <TouchableOpacity
              key={opt.value}
              onPress={() => {
                setSortOption(opt.value as SortOption);
                setSortModal(false);
              }}
              className="py-3"
            >
              <Text
                className={`text-base ${
                  sortOption === opt.value
                    ? "text-cyan-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => setSortModal(false)}
            className="mt-4 bg-gray-200 rounded-xl py-3"
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

export default SortModel;
