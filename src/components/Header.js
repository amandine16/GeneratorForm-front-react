import { Link } from "react-router-dom";
import LogoTellMeMoreSvg from "../assets/icons/logoTellMeMoreSvg";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="logo">
            <LogoTellMeMoreSvg />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
