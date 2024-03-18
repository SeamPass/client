import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";

interface TabProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
const Tab: React.FC<TabProps> = ({ active, setActive }) => {
  return (
    <div>
      <div className="flex items-center gap-[16px]">
        <Button
          onClick={() => setActive(1)}
          className={cn(
            "!w-fit px-2 text-[16px] !rounded-none",
            active === 1
              ? "text-primary-500 border-b border-b-primary-500"
              : "text-grey-100"
          )}
        >
          Master Password
        </Button>
        <Button
          onClick={() => setActive(2)}
          className={cn(
            "!w-fit px-2 text-[16px] !rounded-none",
            active === 2
              ? "text-primary-500 border-b border-b-primary-500"
              : "text-grey-100"
          )}
        >
          Two-step email Verification
        </Button>
      </div>
    </div>
  );
};

export default Tab;
