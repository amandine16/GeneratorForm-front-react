const ButtonAnswer = ({ text }) => {
  return (
    <div className="buttonAnswer">
      <p>{text ? text : "Répondre"}</p>
    </div>
  );
};

export default ButtonAnswer;
