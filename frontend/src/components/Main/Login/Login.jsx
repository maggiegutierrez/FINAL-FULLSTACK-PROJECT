import { useState } from "react";
import "./Login.css";
import { isValidEmail } from "../../../utils/validator";

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleLogin(formData);
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

          <button
            className="login__submit"
            type="submit"
            disabled={
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
          <a className="login__link" href="/register">
            Register
          </a>
        </p>
      </div>
    </section>
  );
}

export default Login;
