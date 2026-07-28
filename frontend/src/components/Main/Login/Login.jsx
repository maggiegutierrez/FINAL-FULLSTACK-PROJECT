import { useState } from "react";
import "./Login.css";

function Login() {
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
              className="login__input"
              type="email"
              id="login-email"
              name="email"
              placeholder="lipa@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="login-password">
              Password
            </label>
            <input
              className="login__input"
              type="password"
              id="login-password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="login__submit" type="submit">
            Login
          </button>
        </form>

        <p className="login__footer">
          Don&apos;t have an account?{" "}
          <a className="login__link" href="/register">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}

export default Login;
