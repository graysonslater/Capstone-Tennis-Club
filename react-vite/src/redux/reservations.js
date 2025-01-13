/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const USERS_RESERVATIONS = "reservations/getUsersReservations";
const usersReservationsAO = (reservations) => ({
    type: USERS_RESERVATIONS,
    payload: reservations
});

/***********************************************************************************************************************************************/
//*                             THUNKS
/***********************************************************************************************************************************************/


//get all reservations for a user
export const usersReservations =() => async (dispatch) => {    
    const request = await fetch('api/reservations/user_reservations');
    const response = await request.json();
    dispatch(usersReservationsAO(response));
    return response;
};


//edit a reservation
export const editReservation = (info) => async (dispatch) => {
    const request = await fatech(`api/reservations/${info.reservationId}`,{
        method: "PATCH",
        body:{
            "date": info.date,
            "players": info.players 
        }
    });
    const response = await request.json()
    dispatch(usersReservations());
    return response;
}


//delete a reservation
export const deleteReservation = (reservationId) => async (dispatch) => {    
    const request = await fetch(`api/reservations/${reservationId}`, {method:"DELETE"});
    const response = await request.json();
    dispatch(usersReservations());
    return response;
};


/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = { reservations : null, usersReservations: []};

function reservationsReducer(state = initialState, action){
    switch (action.type) {
        case USERS_RESERVATIONS:
            return {...state, usersReservations: action.payload};
        default:
            return state;
    }
};

export default reservationsReducer;