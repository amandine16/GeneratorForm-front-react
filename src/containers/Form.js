import GoBack from "../components/GoBack";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import ButtonValid from "../components/buttonValid";

const Form = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);

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

  return isLoading ? (
    <span>En attente ...</span>
  ) : (
    <div className="form">
      <GoBack />
      <div className="content-form">
        <div>SONDAGE</div>

        <div>{data.title}</div>
        <div>{data.questions.length} questions</div>
        <div className="buttonSave">
          <ButtonValid text={"Commencer"} />
        </div>
      </div>
    </div>
  );
};

export default Form;
