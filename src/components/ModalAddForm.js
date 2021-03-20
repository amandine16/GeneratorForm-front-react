import { useState } from "react";
import axios from "axios";
import ButtonAnswer from "../components/ButtonAnswer";
import { useHistory } from "react-router";
import { ReactComponent as Xcircle } from "../assets/icons/feather/x-circle.svg";

const ModalAddForm = ({ setModal, setForms, reload, setReload }) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
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
          { title: title, questions: [], answers: [] }
        );
        if (response.data) {
          setReload(!reload);
          setModal(false);
          history.push(`/forms/${response.data._id}/edit`, {
            idForm: response.data._id,
          });
        }

        // Création d'un tableau qstAndArep à vide à la création du formulaire, dans la table Answer
        const response2 = await axios.post(
          `https://tell-me-more-server.herokuapp.com/answer/create`,
          // `http://localhost:3001/answer/create`,
          { idForm: response.data._id, questionsAndAnswers: [] }
        );
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
          <Xcircle
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
