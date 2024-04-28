import Text from "@/shared/components/typography";
import { RefreshIcon } from "hugeicons-react";
import CustomMemorablePassword from "../custom/CustomMemorablePassword";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import copyToClipboard from "@/utils/copy-to-clipboard";
import { usePasswordStrengthMeter } from "@/hooks/usePasswordMeter";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GeneratorModal from "../modal/generator-modal";
import PasswordStrengthCriteria from "@/shared/components/password-strength-criteria";

const MemorableGenerator = () => {
  const [open, setOpen] = useState(false);
  const [wordList, setWordList] = useState<string[]>([]);
  const [customOptions, setCustomOptions] = useState([
    { text: "Use number", isTrue: false },
    { text: "Use characters", isTrue: false },
    { text: "Use Uppercase", isTrue: false },
  ]);
  const [password, setPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(3);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [strengthColor, setStrengthColor] = useState<string>("");

  useEffect(() => {
    fetch("/eff_large_wordlist.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text.split("\n");
        setWordList(words.filter((word) => word));
      });
  }, []);

  const transformWord = (word: string): string => {
    if (
      customOptions.find(
        (option) => option.text === "Use Uppercase" && option.isTrue
      )
    ) {
      const index = Math.floor(Math.random() * word.length);
      word =
        word.substring(0, index) +
        word.charAt(index).toUpperCase() +
        word.substring(index + 1);
    }
    if (
      customOptions.find(
        (option) => option.text === "Use number" && option.isTrue
      )
    ) {
      word += Math.floor(Math.random() * 10).toString();
    }
    if (
      customOptions.find(
        (option) => option.text === "Use characters" && option.isTrue
      )
    ) {
      const specialChars = "!@#$%^&*";
      word += specialChars[Math.floor(Math.random() * specialChars.length)];
    }
    return word;
  };

  const generatePassword = (): void => {
    if (wordList.length === 0) return;

    // eslint-disable-next-line prefer-const
    let newPassword: string[] = [];
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      const entry = wordList[randomIndex]?.split("\t")[1];
      if (entry) {
        const word = transformWord(entry);
        newPassword.push(word);
      }
    }
    setPassword(newPassword.join("-"));
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordList, passwordLength, customOptions]);

  const handleRefreshClick = (): void => {
    generatePassword();
  };

  // show strength of passwords
  const { handleShowPasswordStrength } = usePasswordStrengthMeter();

  useEffect(() => {
    const result = handleShowPasswordStrength(password);
    setPasswordStrength(result.strengthMessage);
    setStrengthColor(result.color);
  }, [password]);

  const handlePasswordLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // eslint-disable-next-line prefer-const
    let newLength = parseInt(event.target.value, 10);
    if (!isNaN(newLength) && newLength >= 1 && newLength <= 10) {
      setPasswordLength(newLength);
    }
  };

  return (
    <div>
      <div className="flex items-center border border-grey-200  rounded-[16px] h-[75px] overflow-hidden mt-3">
        <div className="flex flex-col w-full">
          <span style={{ color: strengthColor }} className="px-4">
            {passwordStrength}
          </span>
          <input
            disabled
            type="text"
            className="flex-1 !text-primary-300 !font-semibold !text-sm outline-none pt-2 px-4 bg-transparent "
            value={password}
          />
        </div>
        <div className="flex items-center">
          <div className="h-[46px] w-fit border border-grey-200" />
          <RefreshIcon
            onClick={handleRefreshClick}
            className="mx-5 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex space-x-6 justify-end mt-2  pb-4">
        <Text
          onClick={() => copyToClipboard(password)}
          size="xs"
          weight="medium"
          className="text-primary-500 cursor-pointer"
        >
          Copy
        </Text>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger onClick={() => copyToClipboard(password)} asChild>
            <Text size="xs" className="text-primary-500 cursor-pointer">
              Copy & Save
            </Text>
          </DialogTrigger>
          <GeneratorModal
            open={open}
            onOpenChange={setOpen}
            password={password}
          />
        </Dialog>
      </div>

      <PasswordStrengthCriteria />

      <div>
        <Input
          containerStyles="w-[133px] h-[37px]"
          label="Number of words"
          type="number"
          defaultValue={passwordLength.toString()}
          onChange={handlePasswordLengthChange}
          min={1}
          max={10}
        />
      </div>

      <div>
        <CustomMemorablePassword
          options={customOptions}
          setOptions={setCustomOptions}
        />
      </div>
    </div>
  );
};

export default MemorableGenerator;
