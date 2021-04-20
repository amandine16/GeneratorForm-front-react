import { useState, useEffect } from "react";
import axios from "axios";
// Components
import FormCard from "../components/FormCard";
import Loader from "react-loader-spinner";
// Modal
import ModalAddForm from "../components/ModalAddForm";

const Forms = ({ forms, setForms, reload, setReload }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const allForms = async () => {
      try {
        const response = await axios.get(
          "https://tell-me-more-server.herokuapp.com/forms"
        );

        if (response.data) {
          setForms(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    allForms();
  }, [setForms, reload]);

  return isLoading ? (
    <div className="loader">
      <Loader type="BallTriangle" color="#35764b" height={90} width={90} />
    </div>
  ) : (
    <div className="Forms">
      <div className="container">
        <div className="heading">Mes formulaires</div>
        {/* All forms */}
        <div className="allFormsCard">
          {/* Add form */}
          <FormCard empty={true} setModal={setModal} modal={modal} />
          {/* My forms */}
          {forms.map((form, index) => {
            return (
              <FormCard
                title={form.title}
                idForm={form._id}
                key={index}
                form={form}
              />
            );
          })}
        </div>
      </div>
      {/* MODAL ADD FORM */}
      {modal && (
        <ModalAddForm
          setModal={setModal}
          setReload={setReload}
          reload={reload}
          setForms={setForms}
        />
      )}
    </div>
  );
};

export default Forms;
