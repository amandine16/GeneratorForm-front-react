import { ReactComponent as Star } from "../assets/icons/feather/star.svg";
import { ReactComponent as FileText } from "../assets/icons/feather/file-text.svg";

const TypeQuestion = (props) => {
  return (
    <div className="typeQuestion">
      <span>{props.type === "Note" ? <Star /> : <FileText />}</span>
      Ajouter une question "{props.type}"
    </div>
  );
};

export default TypeQuestion;
