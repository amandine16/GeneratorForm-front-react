import GoBack from "../components/GoBack";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import { ReactComponent as ArrowLeft } from "../assets/icons/feather/arrow-left.svg";
import axios from "axios";
import ButtonValid from "../components/buttonValid";

const Form = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  let tabNote = [1, 2, 3, 4, 5];

  //   console.log(data);

  // get all info on form
  useEffect(() => {
    const getInfoForm = async () => {
      try {
        const response = await axios.get(
          `https://tell-me-more-server.herokuapp.com/form/${id}`
        );

        if (response.data) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInfoForm();
  }, [id]);

  const start = () => {
    if (page < data.questions.length) {
      let newPage = page + 1;
      setPage(newPage);
    }
  };
  const previous = () => {
    if (page !== 0) {
      let newPage = page - 1;
      setPage(newPage);
    }
  };

  return isLoading ? (
    <span>En attente ...</span>
  ) : (
    <div className="form">
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
              <div className="buttonSave" onClick={start}>
                <ButtonValid text={"Commencer"} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="content-question">
          {data.questions.map((elem, index) => {
            return (
              <>
                {page === index + 1 && (
                  <>
                    <div className="content">
                      {console.log(page)}
                      {console.log(index + 1)}
                      <div className="numQst">QUESTION {index + 1}</div>
                      <div className="title">{elem.question}</div>
                      <div className="answer">
                        {elem.type === "text" ? (
                          <textarea
                            placeholder="Répondez ici ..."
                            className="textarea"
                          ></textarea>
                        ) : (
                          <div className="listeNote">
                            {tabNote.map((elem, index) => {
                              return (
                                <>
                                  <div
                                    className="note"
                                    style={{
                                      borderTopLeftRadius: elem === 1 && "15px",
                                      borderBottomLeftRadius:
                                        elem === 1 && "15px",
                                      borderTopRightRadius:
                                        elem === 5 && "15px",
                                      borderBottomRightRadius:
                                        elem === 5 && "15px",
                                    }}
                                  >
                                    {elem}
                                  </div>
                                </>
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
                      {page !== data.questions.length && (
                        <button className="next" onClick={start}>
                          Suivant
                        </button>
                      )}
                    </div>
                  </>
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
