/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const ALL_EVENTS = "events/getAllEvents";
const allEventsAO = (events) => ({
    type: ALL_EVENTS,
    payload: events
});

/***********************************************************************************************************************************************/
//*                             THUNKS
/***********************************************************************************************************************************************/

export const allEvents = () => async (dispatch) => {
    const request = await fetch("/api/events");
	const response = await request.json();
	dispatch(allEventsAO(response));
	return response;
};

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {events: null, allEvents: []}

function eventsReducer(state = initialState, action){
    switch (action.type) {
        case ALL_EVENTS:
            return {...state, allEvents: action.payload}
        default:
            return state;
    }
}

export default eventsReducer;