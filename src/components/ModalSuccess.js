import { ReactComponent as Xcircle } from "../assets/icons/feather/x-circle.svg";
import { useHistory } from "react-router-dom";
const ModalSuccess = ({ successMessage, setSuccessMessage, setModal }) => {
  const history = useHistory();
  return (
    <div className="modalSuccess">
      <div className="modal-content">
        <div className="header-modal">
          <span>{successMessage}</span>
          <Xcircle
            icon="times-circle"
            onClick={() => {
              setModal(false);
              setSuccessMessage("");

              successMessage ===
                "Le formulaire a bien été supprimé avec succès !" &&
                history.push("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
