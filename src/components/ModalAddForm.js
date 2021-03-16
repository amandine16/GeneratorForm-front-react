import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import ButtonAnswer from "../components/ButtonAnswer";

const ModalAddForm = ({ setModal, setForms, reload, setReload }) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //   Function for value title
  const handleTitle = (e) => {
    setTitle(e.target.value);
    setErrorMessage("");
  };

  //   Function create new form
  const handleSubmit = (e) => {
    e.preventDefault();
    const AddForm = async () => {
      try {
        const response = await axios.post(
          "https://tell-me-more-server.herokuapp.com/form/create",
          { title: title }
        );
        if (response.data) {
          console.log(response.data);
          setReload(!reload);
          setModal(false);
        }
      } catch (error) {
        console.log(error.response.data);
        if (
          error.response.data.message === "This form's title is already exist"
        ) {
          setErrorMessage("Ce formulaire existe déjà");
        }
      }
    };
    AddForm();
  };

  return (
    <div className="modalAddForm">
      <div className="modal-content">
        <div className="header-modal">
          <span>Ajouter un formulaire</span>
          <FontAwesomeIcon
            icon="times-circle"
            onClick={() => {
              setModal(false);
              setErrorMessage("");
            }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          {/* title form */}
          <input
            type="text"
            onChange={handleTitle}
            value={title}
            placeholder="Titre du formulaire"
          />
          {/* Error */}
          <div className="errorContainer">
            {errorMessage && <span className="error">{errorMessage}</span>}
          </div>
          {/* Button to Validate */}
          <button type="submit" className="btn-none">
            <ButtonAnswer text={"Enregistrer"} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddForm;
