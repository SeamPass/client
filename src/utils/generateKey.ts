/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayBufferToBase64, base64ToArrayBuffer } from "./cryptoUtils";

export async function generateKey(): Promise<string | undefined> {
  try {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256,
      },
      true, // Set to true to make the key extractable
      ["encrypt", "decrypt"]
    );

    const keyBase64 = await exportCryptoKeyToBase64(key);

    return keyBase64;
  } catch (err) {
    console.error("Error generating or exporting key:", err);
    return undefined;
  }
}

export async function importKeyFromBase64(
  base64Key: string
): Promise<CryptoKey> {
  // Convert base64 encoded key to ArrayBuffer
  const keyBuffer = base64ToArrayBuffer(base64Key);

  // Import the key from the ArrayBuffer
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyBuffer,
    {
      name: "AES-CBC",
      length: 256,
    },
    true, // Set to true if you need the key to be extractable
    ["encrypt", "decrypt"]
  );

  return cryptoKey;
}

export async function exportCryptoKeyToBase64(cryptoKey: any) {
  const exportedKey = await window.crypto.subtle.exportKey("raw", cryptoKey);
  return arrayBufferToBase64(exportedKey); // Convert ArrayBuffer to Base64
}
