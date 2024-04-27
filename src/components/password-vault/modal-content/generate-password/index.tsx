import { useState } from "react";
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import RandomGenerator from "./random-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModalHeader from "@/shared/modal-header";
import MemorableGenerator from "./memorable-generator";
import { useNavigate } from "react-router-dom";

const GeneratePassword = () => {
  const [progress, setProgress] = useState<number[]>([0]);

  // This function maps the slider's value (0 to 100) to a range of 1 to 15
  const convertToPasswordLength = (progress: number) => {
    return Math.round((progress / 100) * 14) + 1;
  };

  //display length of slider
  const passwordLength = convertToPasswordLength(progress[0]);

  const navigate = useNavigate();

  return (
    <DialogContent className="max-h-[700px] ">
      <ModalHeader
        subText=" Let passSafe create a unique password for you.Once you are done you
      can copy and save"
        title="Generate Password"
      />

      <DialogDescription className="">
        <Tabs
          defaultValue="random"
          onValueChange={(value: string) => navigate(`?type=${value}`)}
          className="w-full mt-[24px]"
        >
          <TabsList className="max-w-[309px] h-[59px] p-2 justify-start bg-[#F3F9FF] ">
            <TabsTrigger
              className="h-[39px] px-[10px] text-[14px] text-primary-100 data-[state=active]:text-[#F6FAFF] data-[state=active]:bg-primary-500 rounded-[4px] "
              value="random"
            >
              Generate password
            </TabsTrigger>
            <TabsTrigger
              className="h-[39px] px-[10px] text-[14px] text-primary-100 data-[state=active]:text-[#F6FAFF] data-[state=active]:bg-primary-500 rounded-[4px]"
              value="memorable"
            >
              Memorable password
            </TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value={"random"}>
            <RandomGenerator
              setProgress={setProgress}
              passwordLength={passwordLength}
            />
          </TabsContent>
          <TabsContent value={"memorable"}>
            <MemorableGenerator />
          </TabsContent>
        </Tabs>
      </DialogDescription>
    </DialogContent>
  );
};

export default GeneratePassword;
