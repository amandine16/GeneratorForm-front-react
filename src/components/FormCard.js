// import { useState } from "react";
import { ReactComponent as Plus } from "../assets/icons/feather/plus.svg";
import ButtonAnswer from "../components/ButtonAnswer";
import ButtonEdit from "../components/ButtonEdit";

const FormCard = ({ title, empty, setModal, modal, idForm }) => {
  const openModal = () => {
    // open modal
    setModal(true);
  };

  return (
    <div className="formCards">
      {empty ? (
        <div className="cardAddForm" onClick={openModal}>
          <div>
            <Plus color={"white"} width={35} height={35} />
            <p>Nouveau formulaire</p>
          </div>
        </div>
      ) : (
        <div className="cardForm">
          <div>FORMULAIRE</div>
          <p className="titleCard">{title}</p>
          <div className="btnCardForm">
            <div>
              <ButtonEdit idForm={idForm} />
            </div>
            <div>
              <ButtonAnswer idForm={idForm} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormCard;
