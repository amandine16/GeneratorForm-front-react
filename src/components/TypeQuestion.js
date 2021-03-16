import IconTextSvg from "../components/IconTextSvg";
import IconNoteSvg from "../components/IconNoteSvg";

const TypeQuestion = (props) => {
  return (
    <div className="typeQuestion">
      `Ajouter une question "${props.type}"`
      <span>
        {props.type === "text" ? (
          <IconTextSvg size={15} color={"white"} />
        ) : (
          <IconNoteSvg size={15} color={"blue"} />
        )}
      </span>
    </div>
  );
};

export default TypeQuestion;
