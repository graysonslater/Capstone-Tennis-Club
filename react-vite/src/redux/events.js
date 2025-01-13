/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const ALL_EVENTS = "events/getAllEvents";
const allEventsAO = (events) => ({
    type: ALL_EVENTS,
    payload: events
});


const USERS_EVENTS = "events/getUsersEvents";
const usersEventsAO = (events) => ({
    type: USERS_EVENTS,
    payload: events
});


/***********************************************************************************************************************************************/
//*                             THUNKS
/***********************************************************************************************************************************************/


//get all events
export const allEvents = () => async (dispatch) => {
    const request = await fetch("/api/events");
	const response = await request.json();
	dispatch(allEventsAO(response));
	return response;
};


//get all of a users events
export const usersEvents = () => async (dispatch) => {
    const request = await fetch('api/events/user_events');
    const response = await request.json();
    dispatch(usersEventsAO(response));
    return response;
};


//edit a users event
export const editEvent = (info) => async (dispatch) => {
    const request = await fetch(`api/events/${info.eventId}`,{
        method: "PATCH",
        body:{
            "guests": info.guests
        }
    });
    const response = await request.json();
    dispatch(usersEventsAO(response));
    return response;
};


//Delete a users event (does not delete the event itself)
export const deleteEvent = (eventId) => async (dispatch) => {
    const request = await fetch(`api/events/${eventId}`,{method:"DELETE"});
    const response = await request.json();
    dispatch(usersEventsAO(response));
    return response;
};


/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {events: null, allEvents: [], usersEvents: []};

function eventsReducer(state = initialState, action){
    switch (action.type) {
        case ALL_EVENTS:
            return {...state, allEvents: action.payload};
        case USERS_EVENTS:
            return {...state, usersEvents: action.payload};
        default:
            return state;
    }
};

export default eventsReducer;