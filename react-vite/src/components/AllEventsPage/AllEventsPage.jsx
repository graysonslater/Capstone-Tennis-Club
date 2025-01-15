/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allEvents } from "../../redux/events";
import { getUserById } from "../../redux/session";
import CustomModal from "../../context/CustomModal";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function AllEventsPage(){
    const dispatch = useDispatch();

    const {events, user} = useSelector((state) => {
        return{ 
        events: state.events.allEvents,
        user: state.session.user
        }
    });
    console.log("EVENTS FRONT events=", events, "USER= ", user)
    useEffect(() => {
        dispatch(allEvents())
        dispatch(getUserById(user.id))
    },[dispatch]);

/***********************************************************************************************************************************************/
//*                             REGISTER FOR EVENT MODAL
/***********************************************************************************************************************************************/

    const [showRegistration, setShowReg] = useState(false);
    const [eventToReg, setEventToReg] = useState();
    const [guests, setGuests] = useState();

    //event handler for edit
    const handleRegistration = (e, eventId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(editEventThunk({
            eventId: eventId,
            userId: user.id,
            guests: guests
        }))
        setShowReg(false);
    }

    //toggle for modal
    const regEventToggle = (e, event) => {
        e.preventDefault();
        e.stopPropagation();

        if (event) {
            setEventToReg(event);
            setGuests(event.guests);
        } else {
            setEventToReg(null);
            
        }
        setShowReg(!showRegistration);
    };

    const EditEventModal = () => {
        return(
            <>
                {showRegistration && (
                    <CustomModal onClose={(e) => regEventToggle(e)}>
                        <div className="ProfileEditTitle">How Many guests are Coming with you to {eventToReg.event_name}?</div>
                        <div className="ProfileEditButtons">
                            <label className="editEventLabel">
                                Guests:
                                <input
                                    type="number"
                                    min='0'
                                    max="10"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={(e) => handleRegistration(e, eventToReg.event_id)}
                            >
                                Confirm
                            </button>
                            <button type="button" onClick={regEventToggle}>
                                cancel
                            </button>
                        </div>
                    </CustomModal>
                )}
            </>
        )
    };

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <div className="AlleventsBox">
            <h2 className="AllEventsHeader">Upcoming Events</h2>
            <ul className="AllEventsList">
                {events.map((event) => (
                    <li key={event.event_id} className={`ProfileELI${event.event_id}`}>
                        <p>{event.event_name}</p>
                        <p>Registration Price: {event.registration_price}</p>
                        <p>Date: {event.event_date.replace('T', ' at ').slice(0, -3)}</p>
                        <button className="AllEventsRegisterButton" type="button" onClick={(e) => editUserToggle(e, user)}>Register</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default AllEventsPage;