/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { NavLink, useNavigate } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const signup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

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
      <div className="navSec">
        {user ? (
          <>
            <div className="navBarComponent">
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
              <NavLink className="navBarLink" to="/events">
                Events
              </NavLink>
              <button className="navBarLoginBtn" onClick={login}>
                Login
              </button>
              <button className="navBarSignupBtn" onClick={signup}>
                SignUp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
