/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { getUserById } from "./session";

/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const USERS_RESERVATIONS = "reservations/getUsersReservations";
const usersReservationsAO = (reservations) => ({
    type: USERS_RESERVATIONS,
    payload: reservations
});

const RESERVATION_CHECK = "reservations/reservationCheck";
const reservationCheckAO = (check_result) => ({
    type: USERS_RESERVATIONS,
    payload: check_result
});

/***********************************************************************************************************************************************/
//*                             THUNKS
/***********************************************************************************************************************************************/


//get all reservations for a user
export const usersReservations =() => async (dispatch) => {    
    const request = await fetch('/api/reservations/user_reservations');
    const response = await request.json();
    dispatch(usersReservationsAO(response));
    return response;
};

//Create a reservation
export const createReservation = (info) => async () => {
    console.log("RES request= ", info)
    const request = await fetch("/api/reservations",{
        method: "POST",
        body: JSON.stringify({
            "date": info.date,
            "players": info.players 
        })
    });
    const response = await request.json()
    console.log("RES RESPONSE= ", response)
    return response;
}

//edit a reservation
export const editReservation = (info) => async (dispatch) => {
    const request = await fetch(`/api/reservations/${info.reservationId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "date": info.date,
            "players": info.players 
        })
    });
    const response = await request.json()
    dispatch(getUserById(info.userId))
    dispatch(usersReservations());
    return response;
}


//delete a reservation
export const deleteReservation = (info) => async (dispatch) => {    
    const request = await fetch(`/api/reservations/${info.reservationId}`, {method:"DELETE"});
    const response = await request.json();
    dispatch(getUserById(info.userId))
    dispatch(usersReservations());
    return response;
};

//reservation check
export const reservationCheck = (info) => async (dispatch) => {
    const request = await fetch(`/api/reservations/reservation_check`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "date": info.date,
            "players": info.players 
        })
    });
    const response = await request.json()
    reservationCheckAO(response)
    return response;
}


/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = { reservations : null, usersReservations: [], reservationCheck: []};

function reservationsReducer(state = initialState, action){
    switch (action.type) {
        case USERS_RESERVATIONS:
            return {...state, usersReservations: action.payload};
        case RESERVATION_CHECK:
            return {...state, reservationCheck: action.payload};
        default:
            return state;
    }
};

export default reservationsReducer;