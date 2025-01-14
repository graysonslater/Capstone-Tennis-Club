/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserById } from "../../redux/session";
import {editEventThunk, deleteEvent } from "../../redux/events";
import { usersReservations, editReservation, deleteReservation } from "../../redux/reservations";
import CustomModal from "./CustomModal";
import "./ProfilePage.css"

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function ProfilePage(){
    const dispatch = useDispatch();

    //"user" contains all events and reservations for the current user
    const user = useSelector((state) => {return state.session.user});
    console.log("PROFILE FRONT user= ", user, "EVENTS= ", events, "RESERVATIONS= ", reservations)
    
    useEffect(() => {
        dispatch(getUserById(user.id))
    },[dispatch]);


/***********************************************************************************************************************************************/
//*                             EDIT EVENT
/***********************************************************************************************************************************************/
    
    const [showEdit, setShowEdit] = useState(false);
    const [eventToEdit, setEventToEdit] = useState();
    const [guests, setGuests] = useState();

    //event handler for edit
    const handleEdit = (e, eventId) => {
		e.preventDefault();
		e.stopPropagation();
        dispatch(editEventThunk({
            eventId: eventId,
            userId: user.id,
            guests: guests
        }))
        setShowEdit(false);
    }
 

    //toggle for modal
	const editEventToggle = (e, event) => {
		e.preventDefault();
		e.stopPropagation();

		if (event) {
			setEventToEdit(event);
			setGuests(event.guests);
		} else {
			setEventToEdit(null);
			
		}
		setShowEdit(!showEdit);
	};

    const EditEventModal = () => {
        return(
            <>
				{showEdit && (
					<CustomModal onClose={(e) => editEventToggle(e)}>
						<div className="ProfileEditTitle">How Many guests are Coming with you to {eventToEdit.event_name}?</div>
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
								onClick={(e) => handleEdit(e, eventToEdit.event_id)}
							>
								Confirm
							</button>
							<button type="button" onClick={editEventToggle}>
								cancel
							</button>
						</div>
					</CustomModal>
				)}
			</>
        )
    };


/***********************************************************************************************************************************************/
//*                             DELETE EVENT
// flask db init, flask db migrate, flask db upgrade, flask seed  all
/***********************************************************************************************************************************************/
    
    //set modal state
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [eventToDelete, setEventToDelete] = useState(null);


	//send delete to thunk
	const handleDelete = (e, eventId) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(deleteEvent({
            eventId: eventId,
            userId: user.id
        }));
		setShowConfirmDelete(false);
	};


	//toggle for modal
	const deleteEventToggle = (e, event) => {
		e.preventDefault();
		e.stopPropagation();
        
        if (event) {
			setEventToDelete(event);
		} else {
			setEventToDelete(null);
		}
		setShowConfirmDelete(!showConfirmDelete);
	};


    const DeleteEventModal = () => {
        return(
            <>
				{showConfirmDelete && (
					<CustomModal onClose={deleteEventToggle}>
						<div className="deleteMessage">
							Cancel your participation in {eventToDelete.event_name}?
						</div>
						<div className="deleteButtons">
							<button
								type="button"
								onClick={(e) => handleDelete(e, eventToDelete.event_id)}
							>
								Confirm
							</button>
							<button type="button" onClick={(e) => deleteEvent(e)}>
								Cancel
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
        <div className="ProfilePageBox">
            <h2>{user.username}</h2>
            <div className="ProfileUserInfo">
                <p>Firstname: {user.firstname}</p>
                <p>Lastname: {user.lastname}</p>
                <>Email: {user.email}</>
                <p className="ProfileInfoRes">Upcoming Reservations: {reservations.length > 0 ? reservations.length : "None"}</p>
                <p className="ProfileInfoEvents">Upcoming Events: {user.events.length > 0 ? user.events.length : "None"}</p>
            </div>
            <div className="ProfileEvents">
                <h2 className="ProfileEventsHeader">Events</h2>
                <ul className="ProfileEventsList">
                    {user.events.map((event) => (
                        <li key={event.event_id} className={`ProfileELI${event.event_id}`}>
                            <p>{event.event_name}</p>
                            <p>Registration Price: {event.registration_price}</p>
                            <p>Date: {event.event_date}</p>
                            <p>Geusts: {event.guests}</p>
                            <button className="ProfileEditEventButton" type="button" onClick={(e) => editEventToggle(e, event)}>Edit</button>
                            {console.log("HTML=",event)}
                            <button className="ProfileDeleteBut" type="button" onClick={(e) => deleteEventToggle(e, event)}>Delete</button>
                        </li>
                    ))}

                    {/* EVENT MODALS */}
                    <EditEventModal />
                    <DeleteEventModal />
                </ul>
            </div>
            <div className="ProfileReservations">
                <h2 className="ProfileReservationsHeader">Reservations</h2> 
                <ul className="ProfileReservationList">
                    {user.reservations.map((reservation) => (
                        <li key={reservation.id} className={`ProfileRLI${reservation.id}`}>
                            <p>Reservation Number: {reservation.id}</p>
                            <p>Players: {reservation.players}</p>
                            <p>Court Number: {reservation.court_number}</p>
                            <p>Date: {reservation.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default ProfilePage;