import { useHistory } from "react-router-dom";

const ButtonEdit = ({ idForm }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/forms/${idForm}/edit`, { idForm });
  };

  return (
    <div className="buttonEdit" onClick={handleClick}>
      Éditer
    </div>
  );
};

export default ButtonEdit;
