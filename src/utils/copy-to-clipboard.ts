import toast from "react-hot-toast";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);

  // Alert the copied text
  toast("Copied!", {
    position: "top-center",
    style: { backgroundColor: "#4CAF50", color: "#ffffff" },
  });
};

export default copyToClipboard;
