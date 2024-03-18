type ErrorProgressBarProps = {
  progress: number;
};
const ErrorProgressBar: React.FC<ErrorProgressBarProps> = ({
  progress,
}: ErrorProgressBarProps) => {
  const calculateWidth = (progress: number) => `${(progress / 5) * 100}%`;
  console.log(progress);
  const handleProgressColor = () => {
    switch (progress) {
      case 1:
        return "#FFD9D7";
      case 2:
        return "#E3EA8D";
      case 3:
        return "#83B4FF";
      case 4:
        return "#FF8DE6";
      case 5:
        return "#4CAF50";
      default:
        return "#DDDDDD";
    }
  };

  return (
    <div
      style={{
        backgroundColor: handleProgressColor(),
        width: calculateWidth(progress),
      }}
      className="h-1 rounded-[8px]"
    />
  );
};

export default ErrorProgressBar;
