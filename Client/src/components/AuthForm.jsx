import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, CREATE_USER } from "../queries";
import "../styles/AuthForm.css";
import { NoFragmentCyclesRule } from "graphql";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("could not login: ", error);
    },
  });

  useEffect(() => {
    console.log("login result data =>", result.data);
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("queueitUserToken", token);
    }
  }, [result.data]);

  const submitLogin = async (event) => {
    event.preventDefault();
    console.log("Login submited: ", username, password);
    login({ variables: { username, password } });
  };
  return (
    <div className="auth-form">
      <form onSubmit={submitLogin}>
        <div>
          Username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [createUser, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log("could not login: ", error);
    },
  });

  useEffect(() => {
    console.log("signup result data =>", result.data);
    if (result.data) {
      const token = result.data.createUser.value;
      setToken(token);
      localStorage.setItem("queueitUserToken", token);
    }
  }, [result.data]);

  const submitSignUp = async (event) => {
    event.preventDefault();
    console.log("Sign submited: ", username, password);
    createUser({ variables: { username, password } });
  };
  return (
    <div className={`auth-form`}>
      <form onSubmit={submitSignUp}>
        <div>
          Username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
        </div>

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

const AuthForm = ({ setToken }) => {
  const [form, setForm] = useState(true);
  const [formTransition, setFormTransition] = useState(false);
  const handleToggleForm = () => {
    setFormTransition(true);

    setTimeout(() => {
      setFormTransition(false);
    }, 1000);

    setForm(!form);
  };

  return (
    <div id="auth" className={`auth  `}>
      <h2 className={`auth-form-transition ${formTransition ? "show" : ""}`}>
        {form ? "Sign In" : "Sign Up"}
      </h2>

      {form ? (
        <LoginForm setToken={setToken} />
      ) : (
        <SignUpForm setToken={setToken} />
      )}

      <button onClick={handleToggleForm}>
        {form ? "Switch to Sign Up" : "Switch to Sign In"}
      </button>
    </div>
  );
};

export default AuthForm;
