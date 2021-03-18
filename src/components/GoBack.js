import { useHistory } from "react-router-dom";
import { ReactComponent as ChevronLeft } from "../assets/icons/feather/chevron-left.svg";

const GoBack = () => {
  const history = useHistory();
  return (
    <div className="back" onClick={() => history.push("/")}>
      <ChevronLeft /> <span>Mes formulaires</span>
    </div>
  );
};

export default GoBack;
