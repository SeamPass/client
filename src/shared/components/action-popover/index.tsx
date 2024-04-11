import { PopoverContent } from "@/components/ui/popover";

interface ActionPopoverProps {
  actions: {
    open: boolean;
    name: string;
    action: () => void;
    Component: ({
      open,
      setOpen,
    }: {
      open: boolean;
      setOpen: React.Dispatch<boolean>;
    }) => JSX.Element;
  }[];
}
const ActionPopover: React.FC<ActionPopoverProps> = ({ actions }) => {
  console.log(actions);
  return (
    <PopoverContent className="w-[170px] absolute right-[-30px] shadow-none border-[0.5px] border-grey-200">
      <ul className="md:space-y-3">
        {actions?.map(({ name, ...item }) => (
          <li
            onClick={item.action}
            className=" capitalize flex items-center justify-between md:flex-col md:justify-start md:items-start text-grey-100 text-base cursor-pointer"
          >
            {name}
          </li>
        ))}
      </ul>
    </PopoverContent>
  );
};

export default ActionPopover;
