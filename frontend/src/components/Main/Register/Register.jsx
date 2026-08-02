import { useState } from "react";
import "./Register.css";
import { isValidEmail } from "../../../utils/validator";

function Register({ handleRegister }) {
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
    handleRegister(formData);
  }

  const emailError =
    formData.email && !isValidEmail(formData.email)
      ? "Place a valid email"
      : "";

  const passwordError =
    formData.password && formData.password.length < 6
      ? "The password must have at least 6 characters"
      : "";

  const nameError =
    formData.name && formData.name.length < 2
      ? "Your name must have at least 2 characters"
      : "";

  return (
    <section className="register">
      <div className="register__card">
        <h1 className="register__title">REGISTER</h1>
        <p className="register__subtitle">
          Create your account to start searching
        </p>

        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <div className="register__field">
            <label className="register__label" htmlFor="register-name">
              Name
            </label>
            <input
              className={`register__input ${nameError ? "register__input_type_error" : ""}`}
              type="text"
              id="register-name"
              name="name"
              placeholder="Dua Lipa"
              value={formData.name}
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
            />
            <span
              className={`register__input-error ${nameError ? "register__input-error_active" : ""}`}
            >
              {nameError}
            </span>
          </div>

          <div className="register__field">
            <label className="register__label" htmlFor="register-email">
              Email
            </label>
            <input
              className={`register__input ${emailError ? "register__input_type_error" : ""}`}
              type="email"
              id="register-email"
              name="email"
              placeholder="lipa@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span
              className={`register__input-error ${emailError ? "register__input-error_active" : ""}`}
            >
              {emailError}
            </span>
          </div>

          <div className="register__field">
            <label className="register__label" htmlFor="register-password">
              Password
            </label>
            <input
              className={`register__input ${passwordError ? "register__input_type_error" : ""}`}
              type="password"
              id="register-password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
            <span
              className={`register__input-error ${passwordError ? "register__input-error_active" : ""}`}
            >
              {passwordError}
            </span>
          </div>

          <button
            className="register__submit"
            type="submit"
            disabled={
              !formData.email ||
              !formData.password ||
              !formData.name ||
              !isValidEmail(formData.email) ||
              formData.password.length < 6
            }
          >
            Register
          </button>
        </form>

        <p className="register__footer">
          Already have an account?{" "}
          <a className="register__link" href="/login">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}

export default Register;
