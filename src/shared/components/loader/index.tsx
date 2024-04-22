export const PageLoader = () => {
  return (
    <div className="w-screen flex h-screen   justify-center items-center bg-primary-300/80">
      <div className="w-[60px] h-[60px]  border-4 animate-spin  border-b-transparent rounded-full border-primary-500 " />
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="size-6 border-2 border-r-[1px] border-l-[1px]  animate-spin  border-b-transparent rounded-full border-white " />
  );
};
