import { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Check } from "../assets/icons/feather/check.svg";
import ModalError from "../components/ModalError";
import ButtonAnswer from "../components/ButtonAnswer";
import ModalSuccess from "../components/ModalSuccess";
import ContentEdit from "../components/ContentEdit";
import { ReactComponent as Trash } from "../assets/icons/feather/trash.svg";
import GoBack from "../components/GoBack";

const FormEdit = ({ setReload, reload }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [displayCheck, setDisplayCheck] = useState(false);
  const [answers, setAnswers] = useState();
  console.log(answers);
  //   recovery of id form
  const location = useLocation();
  const history = useHistory();
  // const {idForm} = useParams()
  // If there is no identifier on url
  let idForm = "";
  if (location.state) {
    idForm = location.state.idForm;
  } else {
    history.push("/");
  }

  useEffect(() => {
    if (idForm) {
      const getInfoForm = async () => {
        try {
          const response = await axios.get(
            `https://tell-me-more-server.herokuapp.com/form/${idForm}`
          );
          const response2 = await axios.get(
            `https://tell-me-more-server.herokuapp.com/answers/${idForm}`
          );
          if (response.data && response2.data) {
            setTitle(response.data.title);
            setQuestions(response.data.questions);
            setAnswers(response2.data[0]);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getInfoForm();
    } else {
      history.push("/");
    }
  }, [setForm, idForm]);

  //   Function for value title
  const handleTitle = (e) => {
    setDisplayCheck(true);
    setTitle(e.target.value);
    setErrorMessage("");
  };

  //   Function edit title form
  const handleChangeTitleForm = (e) => {
    e.preventDefault();
    const editNameForm = async () => {
      try {
        const response = await axios.post(
          `https://tell-me-more-server.herokuapp.com/form/update/${idForm}`,
          { title: title }
        );
        if (response.data) {
          setReload(!reload);
          setSuccessMessage("Modification enregistrée !");
        }
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.message === "Missing parameters") {
          setErrorMessage("Merci de remplir le champ pour le modifier");
        }
        if (error.response.data.message === "The form does not exist") {
          setErrorMessage("Ce formulaire n'existe pas");
        }
        if (
          error.response.data.message === "This form's title is already exist"
        ) {
          setErrorMessage("Ce formulaire existe déjà");
        }
      }
    };
    editNameForm();
  };

  // Function Delete form
  const deleteForm = async () => {
    try {
      const response = await axios.post(
        `https://tell-me-more-server.herokuapp.com/form/delete/${idForm}`
      );
      if (response.data) {
        setSuccessMessage("Le formulaire a bien été supprimé avec succès !");
        // Success : Open modal success , and then redirection to Home
        setModal(true);
      }
    } catch (error) {
      console.log(error.response.data);

      if (error.response.data.message === "The form does not exist") {
        setErrorMessage("Ce formulaire n'existe pas");
      }
    }
  };

  const answer = () => {
    questions.length !== 0
      ? history.push(`/forms/${idForm}`)
      : setErrorMessage(
          "Vous devez d'abord entrez des questions pour accèder au formulaire"
        );
  };

  return isLoading ? (
    <span>En attente</span>
  ) : (
    <>
      <div className="formEdit container">
        {/* Top edit */}
        <div className="topEdit">
          <GoBack />
          {/* Edit title form */}
          <div className="inputTitleForm">
            <form onSubmit={handleChangeTitleForm}>
              <input type="text" onChange={handleTitle} value={title} />
              {/* Button to Validate */}
              {displayCheck && (
                <button type="submit" className="btn-none check">
                  <Check />
                </button>
              )}
            </form>
          </div>
          <div className="btnTopEdit">
            <div className="deleteForm buttonDelete" onClick={deleteForm}>
              <Trash />
            </div>
            <div className="answerForm" onClick={answer}>
              <ButtonAnswer />
            </div>
          </div>
        </div>

        {/* Content edit ----> Questions */}
        <div className="contentEdit">
          <ContentEdit
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
            idForm={idForm}
            title={title}
            questions={questions}
            setQuestions={setQuestions}
            answers={answers}
          />
        </div>
      </div>
      {/* MODAL Error */}
      <div className="errorContainer">
        {errorMessage && (
          <ModalError
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setModal={setModal}
          />
        )}
      </div>
      {/* MODAL Success*/}
      <div className="successContainer">
        {successMessage && (
          <ModalSuccess
            setSuccessMessage={setSuccessMessage}
            successMessage={successMessage}
            setModal={setModal}
          />
        )}
      </div>
    </>
  );
};

export default FormEdit;
