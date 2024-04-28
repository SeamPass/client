import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ModalHeader from "@/shared/modal-header";
import { useState } from "react";
import WifiModal from "./wifi-modal";
import WebsiteNameModal from "./website--name-modal";
import { cn } from "@/lib/utils";

const GeneratorModal = ({
  open,
  onOpenChange,
  password,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<boolean>;
  password: string;
}) => {
  const [value, setValue] = useState("wifi");

  return (
    <DialogContent
      className={cn("max-h-[500px]", value !== "wifi" && "max-h-[700px]")}
    >
      <ModalHeader title="Copy and save" />
      <Select onValueChange={(value) => setValue(value)}>
        <Label
          className="text-[16px] mb-[-12px] text-[#555555]"
          htmlFor="email"
        >
          Save for
        </Label>
        <SelectTrigger className="w-full h-[48px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            className="py-4 focus:bg-primary-300 text-[1rem] transition-all ease-out duration-200 focus:text-white"
            value="wifi"
          >
            Wifi
          </SelectItem>
          <SelectItem
            className="py-4 focus:bg-primary-300 text-[1rem] transition-all ease-out duration-200 focus:text-white"
            value="Website/App name"
          >
            Website/App name
          </SelectItem>
        </SelectContent>
      </Select>
      {value === "wifi" ? (
        <WifiModal
          open={open}
          onOpenChange={onOpenChange}
          password={password}
        />
      ) : (
        <WebsiteNameModal
          open={open}
          onOpenChange={onOpenChange}
          password={password}
        />
      )}
    </DialogContent>
  );
};

export default GeneratorModal;
