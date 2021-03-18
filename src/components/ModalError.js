import { ReactComponent as Xcircle } from "../assets/icons/feather/x-circle.svg";

const ModalError = ({ errorMessage, setErrorMessage, setModal }) => {
  return (
    <div className="modalError">
      <div className="modal-content">
        <div className="header-modal">
          <span>Erreur</span>
          <Xcircle
            onClick={() => {
              setModal(false);
              setErrorMessage("");
            }}
          />
        </div>

        {/* Error */}
        <div className="errorContainer">
          {errorMessage && <span className="error">{errorMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default ModalError;
