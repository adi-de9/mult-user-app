import * as Crypto from "expo-crypto";

export const hash = (value: string) => {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, value);
};
