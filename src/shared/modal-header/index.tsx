import Text from "../components/typography";
import Header from "../components/typography/Header";
interface ModalHeaderProps {
  title: string;
  subText?: string;
}
const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subText }) => {
  return (
    <div>
      <Header size="sm">{title}</Header>
      <Text size="sm" variant="primary" className="mt-2">
        {subText}
      </Text>
    </div>
  );
};

export default ModalHeader;
