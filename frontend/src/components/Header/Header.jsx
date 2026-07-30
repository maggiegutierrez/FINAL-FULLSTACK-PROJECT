import logo from "../../../public/find-icon.png";
import { useLocation, Link } from "react-router-dom";
import saveIcon from "../../assets/images/save-icon_marked.png";

function Header({ isLoggedIn, onLogout }) {
  const location = useLocation();

  const renderOptions = () => {
    if (isLoggedIn && location.pathname === "/") {
      <>
        <button onClick={onLogout} className="header__logout">
          LOGOUT
        </button>
        <Link to="/saved" className="header__link">
          <img src={saveIcon} alt="Saved jobs" className="header__save-icon" />
        </Link>
        ;
      </>;
    }

    if (isLoggedIn && location.pathname === "/saved") {
      <Link to="/" className="header__link">
        <p>Find another job</p>
      </Link>;
    }
  };

  return (
    <header className="header header__section">
      <img src={logo} alt="Find me a job" className="logo header__logo" />
      {renderOptions}
    </header>
  );
}

export default Header;
