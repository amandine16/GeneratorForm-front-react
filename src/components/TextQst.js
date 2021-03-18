import { ReactComponent as FileText } from "../assets/icons/feather/file-text.svg";

const TextQst = ({ rank }) => {
  return (
    <div className="textQst">
      <span> {rank}</span>
      <span>-</span>

      <FileText />
    </div>
  );
};

export default TextQst;
