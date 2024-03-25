/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayBufferToBase64, base64ToArrayBuffer } from "./cryptoUtils";

export async function encryptUserData(
  data: any,
  key: CryptoKey
): Promise<{ ciphertextBase64: string; ivBase64: string }> {
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    encoder.encode(data)
  );
  return {
    ciphertextBase64: arrayBufferToBase64(encrypted),
    ivBase64: arrayBufferToBase64(iv),
  };
}

export async function decryptUserData(
  encryptedData: string,
  ivBase64: string,
  key: CryptoKey
): Promise<string> {
  const iv = base64ToArrayBuffer(ivBase64);
  const data = base64ToArrayBuffer(encryptedData);

  try {
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      data
    );
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Decryption failed");
  }
}
