import GoBack from "../components/GoBack";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import { ReactComponent as ArrowLeft } from "../assets/icons/feather/arrow-left.svg";
import axios from "axios";
import ButtonValid from "../components/buttonValid";

const Form = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log(data);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [questionsAnswer, setQuestionsAnswer] = useState([]);
  const [answers, setAnswers] = useState();
  const [idAnswer, setIdAnswer] = useState();
  const [noteSelected, setNoteSelected] = useState(null);
  const history = useHistory();
  // Array for select note
  let tabNote = [1, 2, 3, 4, 5];

  // get all info on form , and info of answer
  useEffect(() => {
    const getInfoForm = async () => {
      try {
        const response = await axios.get(
          `https://tell-me-more-server.herokuapp.com/form/${id}`
        );
        const response2 = await axios.get(
          `https://tell-me-more-server.herokuapp.com/answers/${id}`
        );
        if (response.data) {
          setData(response.data);
          console.log(response.data.questions);
        }
        if (response2.data) {
          setAnswers(response2.data[0].questionsAndAnswers);
          setIdAnswer(response2.data[0]._id);
        }
        if (response2.data && response.data) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getInfoForm();
  }, [id]);

  const start = () => {
    // State for note selected reset to zero
    setNoteSelected(null);
    // if start quizz for the first time, i go the first question
    if (page < data.questions.length) {
      let newPage = page + 1;
      setPage(newPage);
    }
    // if state questionAnswer is no empty, is that i want to answer the questions
    if (questionsAnswer.length !== 0) {
      // Add all question (in table form)
      console.log(data.questions);
      let newQuestionsAnswer = [...data.questions];
      // add answer in array answer of this question
      newQuestionsAnswer[page - 1].answer.push(questionsAnswer);

      // Add all question (in table answer)
      let newAnswers = [...answers];
      console.log(newAnswers);
      if (answers.length === 0) {
        // Add all question
        newAnswers = [...data.questions];
        // si j'enlève l'ajout des réponses dans le formulaire, je remettrai cette ligne ci-dessous
        // newAnswers[page - 1].answer.push(questionsAnswer);
      } else if (answers.length < data.questions.length) {
        newAnswers = [...data.questions];
      } else {
        newAnswers[page - 1].answer.push(questionsAnswer);
      }

      const saveQstAnswer = async () => {
        try {
          // Add question and answer in Form
          const response = await axios.post(
            `https://tell-me-more-server.herokuapp.com/form/update/${id}`,
            { questions: newQuestionsAnswer }
          );
          // if (response.data) {
          //   // setSuccessMessage("Vos réponses ont bien été sauvegardées !");
          // }
          // Add question and answer in Answer
          const response2 = await axios.post(
            `https://tell-me-more-server.herokuapp.com/answer/update/${idAnswer}`,
            { questionsAndAnswers: newAnswers }
          );
          if (response2.data) {
            // Update state with all question and new answer
            setAnswers(response2.data.questionsAndAnswers);
          }
        } catch (error) {
          console.log(error);
          // setErrorMessage("Erreur, veuillez réessayer");
        }
      };
      saveQstAnswer();
    }
    // If this the end of the quizz
    if (page >= data.questions.length) {
      let newPage = page + 1;
      setPage(newPage);
    }
  };
  // Function for go to previous page
  const previous = () => {
    if (page !== 0) {
      let newPage = page - 1;
      setPage(newPage);
    }
  };

  // I get the answer, and add it to my questionsAnswer array
  const textAnswer = (event, type, numQst) => {
    setQuestionsAnswer(event.target.value);
  };
  const noteAnswer = (note, type, numQst) => {
    setQuestionsAnswer(note);
    setNoteSelected(note);
  };

  return isLoading ? (
    <span>En attente ...</span>
  ) : (
    <div className="form container">
      {page === 0 ? (
        <>
          <div className="back">
            <GoBack />
          </div>
          <div className="content-form">
            <div className="intro">
              <div>SONDAGE</div>
              <div>{data.title}</div>
              <div>{data.questions.length} questions</div>
              <div onClick={start}>
                <ButtonValid text={"Commencer"} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="content-question">
          {page > data.questions.length && (
            <div className="center">
              <span>Merci d'avoir répondu à ce formulaire</span>
              <div onClick={() => history.push("/")}>
                <ButtonValid
                  text={"Accéder à mes formulaire"}
                  width={"300px"}
                />
              </div>
            </div>
          )}
          {data.questions.map((elem, index) => {
            return (
              <>
                {page === index + 1 && (
                  <div key={index} className="centerAnswer">
                    <div className="content">
                      <div className="numQst">QUESTION {index + 1}</div>
                      <div className="title">{elem.question}</div>
                      <div className="answer">
                        {elem.type === "text" ? (
                          <textarea
                            onChange={(e) => textAnswer(e, "text", index)}
                            placeholder="Répondez ici ..."
                            className="textarea"
                          ></textarea>
                        ) : (
                          <div className="listeNote">
                            {tabNote.map((elem, i) => {
                              return (
                                <div
                                  key={i}
                                  onClick={() =>
                                    noteAnswer(elem, "note", index)
                                  }
                                  className="note"
                                  style={{
                                    borderTopLeftRadius: elem === 1 && "15px",
                                    borderBottomLeftRadius:
                                      elem === 1 && "15px",
                                    borderTopRightRadius: elem === 5 && "15px",
                                    borderBottomRightRadius:
                                      elem === 5 && "15px",
                                    backgroundColor:
                                      noteSelected === elem && "#f09f97",
                                  }}
                                >
                                  {elem}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="btnQst">
                      {/* Button previous and next */}
                      <button className="previous" onClick={previous}>
                        <ArrowLeft />
                        Précedent
                      </button>
                      <button className="next" onClick={start}>
                        Suivant
                      </button>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Form;
