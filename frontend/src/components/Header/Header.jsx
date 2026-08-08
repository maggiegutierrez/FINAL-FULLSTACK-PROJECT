import logo from "../../../public/find-icon.png";
import { useLocation, Link } from "react-router-dom";
import saveIcon from "../../assets/images/save-icon_marked.png";

function Header({ isLoggedIn, onLogout }) {
  const location = useLocation();

  const renderOptions = () => {
    if (isLoggedIn && location.pathname === "/") {
      return (
        <>
          <img src={logo} alt="Find me a job" className="logo header__logo" />
          <button onClick={onLogout} className="header__logout">
            Logout
          </button>
          <Link to="/saved" className="header__saved-jobs">
            <img
              src={saveIcon}
              alt="Saved jobs"
              className="header__save-icon"
            />
          </Link>
        </>
      );
    }

    if (isLoggedIn && location.pathname === "/saved") {
      return (
        <>
          <img src={logo} alt="Find me a job" className="logo header__logo" />
          <Link to="/" className="header__link">
            <p>Find another job</p>
          </Link>
        </>
      );
    }

    if (
      (!isLoggedIn && location.pathname === "/login") ||
      location.pathname === "/register"
    ) {
      return (
        <>
          <img
            src={logo}
            alt="Find me a job"
            className="logo header__logo-first"
          />
        </>
      );
    }

    return null;
  };

  return <header className="header header__section">{renderOptions()}</header>;
}

export default Header;
