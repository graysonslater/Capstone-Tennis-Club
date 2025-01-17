/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allEvents, registerForEvent, registrationCheck } from "../../redux/events";
import { getUserById } from "../../redux/session";
import CustomModal from "../../context/CustomModal";
import "./AllEventsPage.css"

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function AllEventsPage(){
    const dispatch = useDispatch();

    const {events, user} = useSelector((state) => {
        return{ 
        events: state.events.allEvents,
        user: state.session.user,
        }
    });
    // console.log("EVENTS FRONT events=", events, "USER= ", user)

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
        dispatch(registerForEvent({
            eventId: eventToReg.id,
            userId: user.id,
            guests: guests
        }))
        dispatch(allEvents())
        setShowReg(false);
    }

    //toggle for modal
    const regEventToggle = (e, event) => {
        e.preventDefault();
        e.stopPropagation();

        if (event) {
            setEventToReg(event);
            setGuests(0);
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
//*                             REGISTRATION CHECK
//                       disables/enables reserve button
/***********************************************************************************************************************************************/


    const [reservationStatuses, setReservationStatuses] = useState({});

    useEffect(() => {
        const checkReservations = async () => {
            const statuses = {};
            for (const event of events) {
                const check = await dispatch(registrationCheck(event.id));
                statuses[event.id] = !check;
            }
            setReservationStatuses(statuses);
        };

        checkReservations();
    }, [events, dispatch]);
    
    const ReservationCheckModal = ({ eventId }) => {
        return (
            <>
                {reservationStatuses[eventId] && (
                    <button 
                        className="AllEventsRegCheckBut" 
                        type="button" 
                        onClick={(e) => regEventToggle(e, events.find(event => event.id === eventId))}
                    >
                        Register
                    </button>
                )}
            </>
        );
    };
    

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <div className="AlleventsBox">
            <h2 className="AllEventsHeader">Upcoming Events</h2>
            <ul className="AllEventsList">
                {events.map((event) => (
                    <li key={event.id} className={`ProfileELI${event.id}`}>
                        <p>{event.event_name}</p>
                        <p>Registration Price: {event.registration_price}</p>
                        <p>Date: {event.event_date.split(' ').slice(0, 4).join(' ')}</p>
                        <ReservationCheckModal eventId={event.id} />
                    </li>
                ))}
                <EditEventModal />
            </ul>
        </div>
    )

}

export default AllEventsPage;