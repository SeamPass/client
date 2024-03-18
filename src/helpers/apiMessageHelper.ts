import toast from "react-hot-toast";

interface apiMessageHelperProps {
  success?: boolean;
  message?: string;
  onSuccessCallback?: () => void;
  onFailureCallback?: () => void;
}

const apiMessageHelper = ({
  success,
  message,
  onSuccessCallback,
  onFailureCallback,
}: apiMessageHelperProps) => {
  if (!success) {
    onFailureCallback && onFailureCallback();
    message && toast.error(message ?? "");
  } else {
    onSuccessCallback && onSuccessCallback();
    message && toast.success(message ?? "");
  }
};

export default apiMessageHelper;
