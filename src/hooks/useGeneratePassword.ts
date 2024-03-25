import { useEffect, useState } from "react";

const useGeneratePassword = () => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/eff_large_wordlist.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text.split("\n");
        setWordList(words.filter((word) => word));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching word list:", error);
        setIsLoading(false);
      });
  }, []);

  const generatePassword = (): void => {
    if (wordList.length === 0) return;

    if (wordList.length < 3) {
      console.error("Word list is too short.");
      return;
    }

    // eslint-disable-next-line prefer-const
    let newPassword: string[] = [];
    for (let i = 0; i < 3; i++) {
      // Always generate three words
      const randomIndex = Math.floor(Math.random() * wordList.length);
      const entry = wordList[randomIndex]?.split("\t")[1];
      if (entry) {
        const word = transformWord(entry);
        newPassword.push(word);
      }
    }
    setPassword(newPassword.map((word) => capitalize(word)).join("-"));
  };

  const capitalize = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const transformWord = (word: string): string => {
    return word;
  };

  return { generatePassword, password, isLoading };
};

export default useGeneratePassword;
