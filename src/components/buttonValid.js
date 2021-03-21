const ButtonValid = ({ text, width }) => {
  return (
    <div
      className="buttonSave"
      style={{ width: width ? width : 140, height: 50 }}
    >
      {text}
    </div>
  );
};

export default ButtonValid;
