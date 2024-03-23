export interface IPaginate {
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
}

const usePaginate = (paginate: IPaginate) => {
  const handlePageCount = (
    direction: "next" | "prev",
    handlePaginate: () => void
  ) => {
    if (paginate.nextPage && direction === "next") {
      hasNextPage && handlePaginate();
    } else {
      hasPrevPage && handlePaginate();
    }
  };

  const hasNextPage = !!paginate?.hasNextPage;
  const hasPrevPage = !!paginate?.hasPreviousPage;
  const totalPages = paginate?.totalPages;
  const currentPage = paginate?.page;

  return {
    handlePageCount,
    hasNextPage,
    hasPrevPage,
    totalPages,
    currentPage,
  };
};

export default usePaginate;
