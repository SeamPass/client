import { arrayBufferToBase64, base64ToArrayBuffer } from "./cryptoUtils";

export async function encryptUserData(
  data: string,
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
  iv: string,
  key: CryptoKey
): Promise<string> {
  const ivArrayBuffer = base64ToArrayBuffer(iv);
  const dataBuffer = base64ToArrayBuffer(encryptedData);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivArrayBuffer },
    key,
    dataBuffer
  );
  return new TextDecoder().decode(decrypted);
}
