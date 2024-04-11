import { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import RandomGenerator from "./random-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModalHeader from "@/shared/modal-header";
import MemorableGenerator from "./memorable-generator";

const GeneratePassword = () => {
  const [progress, setProgress] = useState<number[]>([0]);

  // This function maps the slider's value (0 to 100) to a range of 1 to 15
  const convertToPasswordLength = (progress: number) => {
    return Math.round((progress / 100) * 14) + 1;
  };

  //display length of slider
  const passwordLength = convertToPasswordLength(progress[0]);

  return (
    <DialogContent>
      <ModalHeader
        subText=" Let passSafe create a unique password for you.Once you are done you
      can copy and save"
        title="Generate Password"
      />

      <Tabs defaultValue="account" className="w-full mt-[24px]">
        <TabsList className="max-w-[309px] h-[59px] p-2 justify-start bg-[#F3F9FF] ">
          <TabsTrigger
            className="h-[39px] px-[10px] text-[14px] text-primary-100 data-[state=active]:text-[#F6FAFF] data-[state=active]:bg-primary-500 rounded-[4px] "
            value="account"
          >
            Generate password
          </TabsTrigger>
          <TabsTrigger
            className="h-[39px] px-[10px] text-[14px] text-primary-100 data-[state=active]:text-[#F6FAFF] data-[state=active]:bg-primary-500 rounded-[4px]"
            value="password"
          >
            Memorable password
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="account">
          <RandomGenerator
            setProgress={setProgress}
            passwordLength={passwordLength}
          />
        </TabsContent>
        <TabsContent value="password">
          <MemorableGenerator />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default GeneratePassword;
