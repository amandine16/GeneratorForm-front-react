import { useState } from "react";
import TextQst from "../components/TextQst";
import NoteQst from "../components/NoteQst";
import { ReactComponent as ChevronDown } from "../assets/icons/feather/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../assets/icons/feather/chevron-up.svg";
import ButtonDelete from "./ButtonDelete";
import TypeQuestion from "../components/TypeQuestion";

const ContentEdit = ({ form, setForm }) => {
  const [switchEdit, setSwitchEdit] = useState(true);
  const [questions, setQuestions] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  // Function to switch from question to answer
  const switchEdition = (type) => {
    type === "answer" ? setSwitchEdit(false) : setSwitchEdit(true);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    console.log(value);
    let newList = [...inputList];
    newList[index].questions = value;
    setInputList(newList);
  };

  const addQst = (type) => {
    const newListQst = [...questions];

    if (type === "text") {
      newListQst.push({ type: "text", question: "" });
    } else {
      newListQst.push({ type: "note", question: "" });
    }

    setQuestions(newListQst);
  };

  return (
    <div className="ContentEdit">
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
      {/* Content according to */}
      {switchEdit ? (
        <div className="formEditQst">
          {questions.map((elem, index) => {
            return (
              <div className="oneQst" key={index}>
                <div className="logoTypeQst">
                  {elem.type === "text" ? (
                    <TextQst rank={elem.rank} />
                  ) : (
                    <NoteQst rank={elem.rank} />
                  )}
                </div>
                <div className="inputQst">
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, index)}
                    value={question}
                    placeholder={elem.title}
                  />
                </div>
                <div className="rankPlusQst">
                  <ChevronDown />
                </div>
                <div className="rankMoinsQst">
                  <ChevronUp />
                </div>
                <div className="trashQst">
                  <ButtonDelete />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="answer">voir réponses</div>
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

      {/* Btn save */}
      <div className="btnSave"></div>
    </div>
  );
};

export default ContentEdit;
