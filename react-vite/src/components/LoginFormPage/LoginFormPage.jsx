import { useEffect, useState } from "react";
import { demoLogin, thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email.length <= 4 || password.length <= 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const demo = async (e) => {
    e.preventDefault();
    await dispatch(demoLogin());
  };

  return (
    <>
      <div className="outterLogin">
        <div className="loginSec">
          <h1>Log In</h1>
          {errors.length > 0 &&
            errors.map((message) => <p key={message}>{message}</p>)}
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <input
                  className="loginInput"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
              <label>
                <input
                  className="loginInput"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              {errors.password && <p>{errors.password}</p>}
            </div>
            <button className="loginButton" type="submit" disabled={disabled}>
              Log In
            </button>
            <br />
            <button className="loginDemo" onClick={demo}>
              Login in as Demo User
            </button>
            <p>
              Don&apos;t have a account?{" "}
              <Link className="loginLink" to={"/signup"}>
                Signup Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
