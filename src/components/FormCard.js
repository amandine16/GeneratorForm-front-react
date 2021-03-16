// import { useState } from "react";
import IconPlusSvg from "../assets/icons/IconPlusSvg";
import ButtonAnswer from "../components/ButtonAnswer";
import ButtonEdit from "../components/ButtonEdit";

const FormCard = ({ title, empty, setModal, modal }) => {
  const openModal = () => {
    // open modal
    setModal(true);
  };

  return (
    <div className="formCards">
      {empty ? (
        <div className="cardAddForm" onClick={openModal}>
          <div>
            <IconPlusSvg color={"white"} width={35} height={35} />
            <p>Nouveau formulaire</p>
          </div>
        </div>
      ) : (
        <div className="cardForm">
          <div>FORMULAIRE</div>
          <p className="titleCard">{title}</p>
          <div className="btnCardForm">
            <div>
              <ButtonEdit />
            </div>
            <div>
              <ButtonAnswer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormCard;
