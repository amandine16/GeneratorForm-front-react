import { useState, useEffect } from "react";

import { useLocation, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { ReactComponent as ChevronLeft } from "../assets/icons/feather/chevron-left.svg";
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
  //   recovery of id form
  const location = useLocation();
  const history = useHistory();
  // const {idForm} = useParams()
  // If there is no identifier on url
  let idForm = "";
  console.log(location.state);
  if (location.state) {
    idForm = location.state.idForm;
  } else {
    history.push("/");
  }

  useEffect(() => {
    // console.log("reload");
    if (idForm) {
      const getInfoForm = async () => {
        try {
          const response = await axios.get(
            `https://tell-me-more-server.herokuapp.com/form/${idForm}`
          );

          if (response.data) {
            setTitle(response.data.title);
            setQuestions(response.data.questions);
            // setForm(response.data);
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
          // console.log(response.data);
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
        console.log(response.data);
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
              <input
                type="text"
                onChange={handleTitle}
                value={title}
                // placeholder={title}
              />
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
            <div
              className="answerForm"
              onClick={() => history.push(`/forms/${idForm}`)}
            >
              <ButtonAnswer />
            </div>
          </div>
        </div>

        {/* Content edit ----> Questions */}
        <div className="contentEdit">
          <ContentEdit
            idForm={idForm}
            title={title}
            questions={questions}
            setQuestions={setQuestions}
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
