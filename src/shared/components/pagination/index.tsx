import {
  ArrowRight02Icon,
  ArrowLeft02Icon,
} from "hugeicons-react";

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  currentPage: number;
  handlePageCount: (
    direction: "next" | "prev",
    handlePaginate: () => void
  ) => void;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination: React.FC<PaginationProps> = ({
  // hasNextPage,
  // hasPrevPage,
  totalPages,
  currentPage,
  handlePageCount,
  setPageCount,
}) => {
  return (
    <div className="flex justify-between py-[10.5px] px-[33px]">
      <div className="flex items-center justify-center">
        <p
          onClick={() =>
            handlePageCount("prev", () =>
              setPageCount((currentPage as number) - 1)
            )
          }
          className="flex items-center cursor-pointer text-grey-100"
        >
          <ArrowLeft02Icon className="size-6" />
        </p>
      </div>

      <div className="flex items-center justify-center text-sm">
        <span className="text-grey-100">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <p
          onClick={() =>
            handlePageCount("next", () =>
              setPageCount((currentPage as number) + 1)
            )
          }
          className="flex items-center cursor-pointer text-grey-100"
        >
          <ArrowRight02Icon className="size-6" />
        </p>
      </div>
    </div>
  );
};

export default Pagination;
