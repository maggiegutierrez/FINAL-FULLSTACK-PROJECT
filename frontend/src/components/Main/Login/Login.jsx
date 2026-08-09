import { useState } from "react";
import { isValidEmail } from "../../../utils/validator";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoginError("");
    setIsSubmitting(true);
    handleLogin(formData)
      .catch(() => {
        setLoginError("Incorrect email or password. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const emailError =
    formData.email && !isValidEmail(formData.email)
      ? "Place a valid email"
      : "";

  const passwordError =
    formData.password && formData.password.length < 6
      ? "The password must have at least 6 characters"
      : "";

  return (
    <section className="login">
      {isSubmitting && (
        <div className="login__spinner-overlay">
          <div className="login__spinner-loader"></div>
        </div>
      )}
      <div className="login__card">
        <h1 className="login__title">LOGIN</h1>
        <p className="login__subtitle">
          Access your account to start searching
        </p>

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <div className="login__field">
            <label className="login__label" htmlFor="login-email">
              Email
            </label>
            <input
              className={`login__input ${emailError ? "login__input_type_error" : ""}`}
              type="email"
              id="login-email"
              name="email"
              placeholder="lipa@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span
              className={`login__input-error ${emailError ? "login__input-error_active" : ""}`}
            >
              {emailError}
            </span>
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="login-password">
              Password
            </label>
            <input
              className={`login__input ${passwordError ? "login__input_type_error" : ""}`}
              type="password"
              id="login-password"
              name="password"
              placeholder="Password"
              minLength="6"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className={`login__input-error ${passwordError ? "login__input-error_active" : ""}`}
            >
              {passwordError}
            </span>
          </div>
          {loginError && <p className="login__error">{loginError}</p>}
          <button
            className="login__submit"
            type="submit"
            disabled={
              isSubmitting ||
              !formData.email ||
              !formData.password ||
              !isValidEmail(formData.email) ||
              formData.password.length < 6
            }
          >
            Login
          </button>
        </form>
        <p className="login__footer">
          Don't have an account?{" "}
          <Link className="login__link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
