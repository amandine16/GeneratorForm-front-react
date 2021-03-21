import { useState } from "react";
import TextQst from "../components/TextQst";
import NoteQst from "../components/NoteQst";
import { ReactComponent as ChevronDown } from "../assets/icons/feather/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../assets/icons/feather/chevron-up.svg";
import { ReactComponent as Trash } from "../assets/icons/feather/trash.svg";
import TypeQuestion from "../components/TypeQuestion";
import axios from "axios";
import ButtonValid from "./buttonValid";

const ContentEdit = ({
  idForm,
  questions,
  setQuestions,
  setSuccessMessage,
  setErrorMessage,
  answers,
}) => {
  const [switchEdit, setSwitchEdit] = useState(true);
  const [question, setQuestion] = useState("");

  // Loop for to condition display of answer
  let tab = [];
  if (answers.questionsAndAnswers.length !== 0) {
    for (let i = 0; i < answers.questionsAndAnswers[0].answer.length; i++) {
      for (let y = 0; y < answers.questionsAndAnswers.length; y++) {
        tab.push({
          q: answers.questionsAndAnswers[y].question,
          type: answers.questionsAndAnswers[y].type,
          rep: answers.questionsAndAnswers[y].answer[i],
          rank: y + 1,
          // last allows to determine if we display borderBottom
          last: y === answers.questionsAndAnswers.length - 1 ? true : false,
        });
      }
    }
    console.log(tab);
  }
  // Array for answer note
  let tabNote = [1, 2, 3, 4, 5];

  // Function to switch from question to answer
  const switchEdition = (type) => {
    type === "answer" ? setSwitchEdit(false) : setSwitchEdit(true);
  };

  // change input question
  function handleInputChange(event, index) {
    // save the question
    setQuestion(event.target.value);
    const newQuestions = [...questions];
    // add question in array with all questions, at index of map
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  }

  // Add question text or note
  const addQst = (type) => {
    const newListQst = [...questions];
    let question = {};
    if (type === "text") {
      question = {
        question: "",
        type: "text",
        answer: [],
      };
    } else {
      question = {
        question: "",
        type: "note",
        answer: [],
      };
    }
    newListQst.push(question);
    setQuestions(newListQst);
  };

  const saveQst = async () => {
    if (questions.length !== 0) {
      try {
        const response = await axios.post(
          `https://tell-me-more-server.herokuapp.com/form/update/${idForm}`,
          { questions: questions }
        );
        if (response.data) {
          setSuccessMessage("Vos questions ont bien été sauvegardées !");
        }
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage("Erreur, veuillez réessayer");
      }
    } else {
      setErrorMessage(
        "Vous devez d'abord entrez une première question avant de sauvegarder !"
      );
    }
  };

  const trashQst = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  // modify order question +
  const upOrder = (index) => {
    if (index > 0) {
      const newQuestions = [...questions];
      // save my question
      let myQst = newQuestions[index];
      // replace my question with previous question
      newQuestions[index] = newQuestions[index - 1];
      // my qst previous egal myQst actual
      newQuestions[index - 1] = myQst;
      setQuestions(newQuestions);
    }
  };

  // modify order question -
  const downOrder = (index) => {
    if (index < questions.length - 1) {
      const newQuestions = [...questions];
      // save my question
      let myQst = newQuestions[index];
      // the question in index actual is the questions next
      newQuestions[index] = newQuestions[index + 1];
      // replace my question in new order index-
      newQuestions[index + 1] = myQst;
      setQuestions(newQuestions);
    }
  };

  return (
    <div
      className="ContentEdit"
      style={{ justifyContent: !switchEdit && "flex-start" }}
    >
      {/* Top */}
      <div className="top">
        <div
          className={
            switchEdit ? "switchQuestion line " : "switchQuestion inactive"
          }
          onClick={() => switchEdition("qst")}
        >
          Questions
        </div>
        <div
          className={
            !switchEdit ? "switchAnswer line" : "switchAnswer inactive"
          }
          onClick={() => switchEdition("answer")}
        >
          Réponses
        </div>
      </div>
      {/* QUESTION AND EDIT QUESTION */}
      {switchEdit ? (
        <div className="formEditQst">
          {questions.length !== 0 ? (
            questions.map((elem, index) => {
              return (
                <div className="oneQst" key={index}>
                  <div className="logoTypeQst">
                    {elem.type === "text" ? (
                      <TextQst rank={index} />
                    ) : (
                      <NoteQst rank={index} />
                    )}
                  </div>
                  <div className="inputQst">
                    <input
                      type="text"
                      onChange={(e) => handleInputChange(e, index)}
                      value={questions[index].question}
                      placeholder={
                        elem.question ? elem.question : "Écrivez la question"
                      }
                    />
                  </div>
                  <div
                    className="rankMoinsQst"
                    onClick={() => downOrder(index)}
                  >
                    <ChevronDown />
                  </div>
                  <div className="rankPlusQst" onClick={() => upOrder(index)}>
                    <ChevronUp />
                  </div>
                  <div
                    className="trashQst"
                    onClick={() => {
                      trashQst(index);
                    }}
                  >
                    <Trash />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="noQuestion">
              Aucune question associées à ce formulaire, cliquez sur ajouter une
              question texte ou note !
            </div>
          )}
          {/* Button Type new Question */}
          <div className="btnTypeNewQst">
            <div className="btnAddQstText" onClick={() => addQst("text")}>
              <TypeQuestion type={"Texte"} />
            </div>
            <div className="btnAddQstNote" onClick={() => addQst("note")}>
              <TypeQuestion type={"Note"} />
            </div>
          </div>
        </div>
      ) : // ANSWER
      tab.length !== 0 ? (
        <div className="answer">
          {tab.map((elem, index) => {
            return (
              elem.rep !== undefined && (
                <div
                  key={index}
                  className="oneAnswer"
                  style={{
                    borderBottom: elem.last && "1px solid #62c188",
                    paddingBottom: elem.last && "30px",
                  }}
                >
                  {/* icon text or note for question */}
                  <div
                    className="logoTypeQst"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    {elem.type === "text" ? (
                      <TextQst rank={elem.rank} />
                    ) : (
                      <NoteQst rank={elem.rank} />
                    )}
                    <p className="titleQuestion">{elem.q}</p>
                  </div>

                  {elem.type === "text" ? (
                    <p className="rep">{elem.rep !== undefined && elem.rep}</p>
                  ) : (
                    <div className="listeNote">
                      {tabNote.map((num, i) => {
                        return (
                          <div
                            key={i}
                            className="note"
                            style={{
                              backgroundColor:
                                num === Number(elem.rep) && "#f09f97",
                              borderTopLeftRadius: num === 1 && "10px",
                              borderBottomLeftRadius: num === 1 && "10px",
                              borderTopRightRadius: num === 5 && "10px",
                              borderBottomRightRadius: num === 5 && "10px",
                            }}
                          >
                            {num}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            );
          })}
        </div>
      ) : (
        <div className="answer" style={{ margin: "auto" }}>
          <div className="noQuestion">
            Aucune réponses associées à ce formulaire, cliquez sur répondre pour
            commencer le quiz !
          </div>
        </div>
      )}
      {switchEdit && (
        /* Btn save */
        <div className="btnSave" onClick={saveQst}>
          <ButtonValid text={"Sauvegarder"} />
        </div>
      )}
    </div>
  );
};

export default ContentEdit;
