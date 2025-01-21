/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { NavLink, useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const login = (e) => {
  //   e.preventDefault();
  //   navigate("/login");
  // };

  // const signup = (e) => {
  //   e.preventDefault();
  //   navigate("/signup");
  // };

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/");
  };

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
  return (
    <div className="navBar">
      <a href="/" className="logo-link">
        <div className="logo"></div>
      </a>
      <div className="navSec">
        {user ? (
          <>
            <div className="navBarComponent">
              <NavLink className="navBarLink" to="/home" >
                Home
              </NavLink>
              <button className="navBarLogoutBtn" onClick={logout}>
                Logout
              </button>
              <NavLink className="navBarLink" to="/profile" >
                Profile
              </NavLink>
              <NavLink className="navBarLink" to="/reservations">
                Reserve A Court
              </NavLink>
              <NavLink className="navBarLink" to="/events">
                Events
              </NavLink>
              <NavLink className="navBarLink" to="/photos">
                Photos
              </NavLink>
            </div>
            {/* <ProfileButton /> */}
          </>
        ) : (
          <>
            <div className="navBarLoginSignupBtn">
              <NavLink className="navBarLoginBtn" to="/login">
                Login
              </NavLink>
              <NavLink className="navBarSignupBtn" to="/signup">
                SignUp
              </NavLink>
              <NavLink className="navBarLink" to="/events">
                Events
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
