// Function to generate a random salt
export function generateSalt(length: number = 32): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

// Helper function to convert an ArrayBuffer to a Base64 string
function bufferToBase64(buffer: ArrayBuffer): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer) as any));
}

// Function to hash a password using PBKDF2
export async function hashPassword(
  password: string,
  salt: string
): Promise<string> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedKey = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 10000,
      hash: "SHA-512",
    },
    keyMaterial,
    512 // Ensure this matches the desired bit length
  );

  // Use bufferToBase64 instead of bufferToHex
  return bufferToBase64(derivedKey);
}
