import { useState } from "react";
import "./Register.css";

function Register() {
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
  }

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
              className="register__input"
              type="text"
              id="register-name"
              name="name"
              placeholder="Dua Lipa"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="register__field">
            <label className="register__label" htmlFor="register-email">
              Email
            </label>
            <input
              className="register__input"
              type="email"
              id="register-email"
              name="email"
              placeholder="lipa@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="register__field">
            <label className="register__label" htmlFor="register-password">
              Password
            </label>
            <input
              className="register__input"
              type="password"
              id="register-password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="register__submit" type="submit">
            Register
          </button>
        </form>

        <p className="register__footer">
          Don&apos;t have an account?{" "}
          <a className="register__link" href="/login">
            Register
          </a>
        </p>
      </div>
    </section>
  );
}

export default Register;
