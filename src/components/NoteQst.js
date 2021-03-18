import { ReactComponent as Star } from "../assets/icons/feather/star.svg";

const NoteQst = ({ rank }) => {
  return (
    <div className="noteQst">
      <span>{rank} </span> <span>- </span>
      <Star />
    </div>
  );
};

export default NoteQst;
