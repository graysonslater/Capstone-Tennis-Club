import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (username.length <= 4 || password.length <= 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [username, password]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        firstname,
        lastname,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="outterSignup">
        <div className="innerSignup">
          <div className="glowSec">
            <h2 className="glowH2">Bigger</h2>
            <h2 className="glowH2">Investments</h2>
            <h2 className="glowH2">Towards</h2>
            <h2 className="glowH2">Your</h2>
            <h2 className="glowH2">Future</h2>
          </div>
          <div className="signupSec">
            <h1>Sign Up</h1>
            {errors.server && <p>{errors.server}</p>}
            <form className="signupForm" onSubmit={handleSubmit}>
              <div>
                <label>
                  <input
                    className="signupInput"
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
                    className="signupInput"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                <label>
                  <input
                    className="signupInput"
                    placeholder="First Name"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </label>
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label>
                  <input
                    className="signupInput"
                    placeholder="Last Name"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </label>
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label>
                  <input
                    className="signupInput"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.password && <p>{errors.password}</p>}
              </div>
              <div>
                <label>
                  <input
                    className="signupInput"
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              </div>
              <button
                className="signupButton"
                type="submit"
                disabled={disabled}
              >
                Sign Up
              </button>
              <p>
                Already have a account? <Link className="signupLink" to={"/login"}>Login Here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
