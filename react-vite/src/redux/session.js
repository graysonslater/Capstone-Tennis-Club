/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const SET_USER = 'session/setUser';
const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const REMOVE_USER = 'session/removeUsr';
const removeUser = () => ({
  type: REMOVE_USER
});

const USERNAME_CHECK = 'session/userNamecheck';
const userNameCheckAO = (user) => ({
  type: USERNAME_CHECK,
  payload: user
});

const EMAIL_CHECK = 'session/emailCheck';
const emailCheckAO = (user) => ({
  type: EMAIL_CHECK,
  payload: user
});

const DELETE_USER = 'session/deleteUser';
const deleteUser = () => ({
  type: DELETE_USER,
})

/***********************************************************************************************************************************************/
//*                             THUNKS
/***********************************************************************************************************************************************/

//autherize
export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
	dispatch(setUser(data));
	}
};

//login
export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
	} else if (response.status < 500) {
		const errorMessages = await response.json();
		return errorMessages;
	} else {
		return { server: "Something went wrong. Please try again" };
	}
};

//demo login
export const demoLogin = () => async (dispatch) => {
  const user = { email: "demo1@aa.io", password: "password" };
  const response = await fetch("api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
	} else if (response.status < 500) {
		const errorMessages = await response.json();
		return errorMessages;
	} else {
		return { server: "Something went wrong. Please try again" };
	}
};

//signup
export const thunkSignup = (user) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
	} else if (response.status < 500) {
		const errorMessages = await response.json();
		return errorMessages;
	} else {
		return { server: "Something went wrong. Please try again" };
	}
};

//logout
export const thunkLogout = () => async (dispatch) => {
	await fetch("/api/auth/logout");
	dispatch(removeUser());
	window.location.href = "/";
};

//get one user, needed for use with a dispatch 
export const getUserById = (userId) => async (dispatch) => {
    const request = await fetch(`/api/users/${userId}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const response = await request.json();
    dispatch(setUser(response));
    return response;
};

//update user
export const editUser = (info) => async (dispatch) => {
    const request = await fetch(`/api/users/${info.userId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: info.username,
          firstname: info.firstname,
          lastname: info.lastname,
          email: info.email
        })
    })
    const response = await request.json();
    dispatch(getUserById(info.userId));
    return response;
};

//UserName check
export const userNameCheck = (username) => async (dispatch) => {
  const request = await fetch(`/api/users/userNameCheck/${username}`,{
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
      }
  });
  const response = await request.json();
  dispatch(userNameCheckAO(response));
  return response;
};

//email check
export const emailCheck = (email) => async (dispatch) => {
  const request = await fetch(`/api/users/emailCheck/${email}`,{
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
      }
  });
  const response = await request.json();
  dispatch(emailCheckAO(response));
  return response;
};

//delete user
export const thunkDeleteUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`, {
		method: "DELETE",
		headers: { "Context-Type": "application/json" },
	});

  if (response.ok) {
    dispatch(deleteUser(userId));
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

//deposite funds
export const depositFunds = (info) => async (dispatch) => {
  const request = await fetch(`/api/users/add_money/${info.userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"money":info.money})
  });
  const response = await request.json();
  dispatch(getUserById(info.userId));
  return response;
};


/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = { user: null, userNameCheckState: [], emailCheckState: [] };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case USERNAME_CHECK:
      return {...state, userNameCheckState: action.payload};
    case EMAIL_CHECK:
      return {...state, emailCheckState: action.payload};
    case DELETE_USER:
        return { ...state, user: action.payload }
    default:
      return state;
  }
}

export default sessionReducer;
