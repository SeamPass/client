// CryptoUtils.ts
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// Converts a Base64 string to an ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  // Adjust base64 string padding if necessary
  while (base64.length % 4) {
    base64 += "=";
  }

  const regularBase64 = base64.replace(/-/g, "+").replace(/_/g, "/");
  // Decode the string
  const binaryString = atob(regularBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
