/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, editUser, thunkDeleteUser, userNameCheck, emailCheck } from "../../redux/session";
import {editEventThunk, deleteEvent} from "../../redux/events";
import {editReservation, deleteReservation, reservationCheck} from "../../redux/reservations";
import CustomModal from "../../context/CustomModal";
import "./ProfilePage.css"

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function ProfilePage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //"user" contains all events and reservations for the current user
    const user = useSelector((state) => {return state.session.user});
    console.log("USER OBJECT= ",user)

    useEffect(() => {
        dispatch(getUserById(user.id))
    },[dispatch]);

/***********************************************************************************************************************************************/
//*                             EDIT USER
/***********************************************************************************************************************************************/

    //! MUST VERIFY EMAIL IS IN CORRECT FORMAT
    const [showEditUser, setShowEditUser] = useState(false);
    const [username, setUsername] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();

    //event handler for edit
    const handleUserEdit =  async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setEditErrors({});
        let validationErrors = {};
        if (username.length < 1) {
            validationErrors.username = "UserName must be at least 1 character";
        }
        if (firstname.length < 1) {
            validationErrors.firstname = "first name must be at least 1 character";
        }
        if (lastname.length < 1) {
            validationErrors.lastname = "last name must be at least 1 character";
        }

        //check username
        const userNameTaken = await dispatch(userNameCheck(username));
        if (userNameTaken.exists && userNameTaken.exists.username != user.username) {
            validationErrors.username = `${username} is already taken!`;
        }

        //check email
        const emailTaken = await dispatch(emailCheck(email));
        if (emailTaken.exists && emailTaken.exists.email != user.email) {
            validationErrors.email = `${email} is already taken!`;
        }
        if (Object.keys(validationErrors).length > 0) {
            setEditErrors(validationErrors);
            return;
        }

        dispatch(editUser({
            userId: user.id,
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email
        }))
        setShowEditUser(false);
    }

    //toggle for modal
    const editUserToggle = (e, userToUpdate) => {
        e.preventDefault();
		e.stopPropagation();
		if (userToUpdate) {
			setEventToEdit(userToUpdate);
			setUsername(userToUpdate.username)
            setFirstname(userToUpdate.firstname)
            setLastname(userToUpdate.lastname)
            setEmail(userToUpdate.email)
		} else {
			setEventToEdit(null);
			
		}
		setShowEditUser(!showEditUser);
    };

    const EditUserModal = () => {
        return(
            <>
                {showEditUser && (
                    <CustomModal onClose={(e) => editUserToggle(e)}>
                        <div className="ProfileUserEditTitle">Edit Profile Information</div>
                        <div className="ProfileUserEditButtons">
                            <label className="editCurrentUser">
                                Username:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username && (<span className="profileErrors">{errors.username}</span>)}
                            </label>
                            <label className="editCurrentUser">
                                Firstname:
                                <input
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                                {errors.firstname && (<span className="profileErrors">{errors.firstname}</span>)}
                            </label>
                            <label className="editCurrentUser">
                                Lastname:
                                <input
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                                {errors.lastname && (<span className="profileErrors">{errors.lastname}</span>)}
                            </label>
                            <label className="editCurrentUser">
                                Email:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (<span className="profileErrors">{errors.email}</span>)}
                            </label>
                            <button
                                type="button"
                                onClick={(e) => handleUserEdit(e)}
                            >
                                Confirm
                            </button>
                            <button type="button" onClick={editUserToggle}>
                                cancel
                            </button>
                        </div>
                    </CustomModal>
                )}
            </>
        )
    };

/***********************************************************************************************************************************************/
//*                             DELETE USER
/***********************************************************************************************************************************************/
    
    //set modal state
	const [showUserDelete, setShowUserDelete] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null);
    
	//send delete to thunk
	const handleUserDeletion = (e, userId) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(thunkDeleteUser(user.id));
		navigate("/home");
	};

	//toggle for modal
	const deleteUserToggle = (e, user) => {
		e.preventDefault();
		e.stopPropagation();
        
        if (user) {
			setUserToDelete(user);
		} else {
			setUserToDelete(null);
		}
		setShowUserDelete(!showUserDelete);
	};

    const DeleteUserModal = () => {
        return(
            <>
				{showUserDelete && (
					<CustomModal onClose={deleteUserToggle}>
						<div className="deleteMessage">
							Delete your profile?
						</div>
						<div className="deleteButtons">
							<button
								type="button"
								onClick={(e) => handleUserDeletion(e, userToDelete.id)}
							>
								Confirm
							</button>
							<button type="button" onClick={(e) => deleteUserToggle(e)}>
								Cancel
							</button>
						</div>
					</CustomModal>
				)}
			</>
        )
    };

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
        console.log("EDIT TOGGLE= ", event)
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
                        <>{console.log("EDIT MODAL= ",eventToEdit)}</>
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
                            <>{console.log("MODAL = ",eventToDelete)}</>
							Cancel your participation?
						</div>
						<div className="deleteButtons">
							<button
								type="button"
								onClick={(e) => handleDelete(e, eventToDelete.event_id)}
							>
								Confirm
							</button>
							<button type="button" onClick={(e) => deleteEventToggle(e)}>
								Cancel
							</button>
						</div>
					</CustomModal>
				)}
			</>
        )
    };

/***********************************************************************************************************************************************/
//*                             EDIT RESERVATION
/***********************************************************************************************************************************************/
    
    const [showReservation, setShowReservation] = useState(false);
    const [reservationToEdit, setReservationToEdit] = useState();
    const [newDate, setNewDate] = useState();
    const [newPlayers, setNewPlayers] = useState();
    const [newTime, setNewTime] = useState()
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [errors, setEditErrors] = useState({});

    //use a for loop to create avalable times for drop down menu
    const availableTimes = [];
    for (let hour = 9; hour <= 20; hour++) {
        availableTimes.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    //set min and max date for date selection menu
    useEffect(() => {
        //get todays date
        const today = new Date();
        //set todays date as minimum date
        setMinDate(today.toISOString().split('T')[0]);
        //create a new variable to be used for assigning max date
        const nextYear = new Date(today);
        //add 1 year to current date
        nextYear.setFullYear(today.getFullYear() + 1);
        //set max date using next year date
        setMaxDate(nextYear.toISOString().split('T')[0]);
    }, [dispatch]);

    //event handler for edit Reservation
    const handleReservationEdit = async (e, reservationId) => {
        e.preventDefault();
        e.stopPropagation();

        if(!newDate && !newTime){
            dispatch(editReservation({
                date: "None",
                players: newPlayers,
                reservationId: reservationId,
                userId: user.id
            }))
            setNewTime()
            setNewDate()
            setShowReservation(false);
        }

        //error handling for date/time
        setEditErrors({});
        let errors = {};
        if (!newDate){
            errors.date = "Choose a date!";
        }
        if (!newTime){
            errors.time = "Choose a Time!";
        }
        if (Object.keys(errors).length > 0) {
            setEditErrors(errors);
            return;
        }

        //format date/time for backend
        const formattedDate = newDate.split('T')[0] + ' ' + newTime + ':00';

        //check if reservation update is valid
        const check =  await dispatch(reservationCheck({
            date: formattedDate,
            players: newPlayers,
        }))
        if (check){
            errors.check = check.error
        }
        if (Object.keys(errors).length > 0) {
            setEditErrors(errors);
            return;
          }
        //if check returns false, send request to backend
        dispatch(editReservation({
            date: formattedDate,
            players: newPlayers,
            reservationId: reservationId,
            userId: user.id
        }))
        setNewTime()
        setNewDate()
        //close the modal
        setShowReservation(false);
    }

    //toggle for edit reservation modal
    const reservationEventToggle = (e, reservation) => {
        e.preventDefault();
        e.stopPropagation();
        setEditErrors({})
        if (reservation) {
            setReservationToEdit(reservation);
            // setNewDate(reservation.date)
            setNewPlayers(reservation.players)
        } else {
            setReservationToEdit(null);
            
        }
        setShowReservation(!showReservation);
    };

    //html for modal
    const EditReservationModal = () => {
        return(
            <>
                {showReservation && (
                    <CustomModal onClose={(e) => reservationEventToggle(e)}>
                        <div className="ProfileEditResTitle">Update your reservation for {reservationToEdit.date.replace('T', ' at ').slice(0, -3)}?</div>
                        <div className="ProfileEditResButtons">
                            <label className="editResPlayers">
                                Players:
                                <input
                                    type="number"
                                    min='1'
                                    max="4"
                                    value={newPlayers}
                                    onChange={(e) => setNewPlayers(e.target.value)}
                                />
                            </label>
                            <label className="editResDate">
                                Date:
                                <input
                                    type="date"
                                    min={minDate}
                                    max={maxDate}
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                />
                                {errors.date && (
                                    <span className="ReservationErrors">{errors.date}</span>
                                )}
                            </label>
                            <label className="editResDate">
                                Time:
                                <div>
                                    Time:
                                    <select value={newTime} onChange={(e) => setNewTime(e.target.value)} required>
                                        <option value="" disabled>Select a time</option>
                                        {availableTimes.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </div> 
                                {errors.time && (
                                    <span className="ReservationErrors">{errors.time}</span>
                                )}                        
                            </label>
                            <button
                                type="button"
                                onClick={(e) => handleReservationEdit(e, reservationToEdit.id)}
                            >
                                Confirm
                            </button>
                            <button type="button" onClick={reservationEventToggle}>
                                cancel
                            </button>
                            {errors.check && (
                                <span className="ReservationErrors">{errors.check}</span>
                            )}
                        </div>
                    </CustomModal>
                )}
            </>
        )
    };

/***********************************************************************************************************************************************/
//*                             DELETE RESERVATION
/***********************************************************************************************************************************************/
    
    //set modal state
	const [showResDelete, setShowResDelete] = useState(false);
	const [resToDelete, setResToDelete] = useState(null);
    
	//send delete to thunk
	const handleReservationDelete = (e, reservationId) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(deleteReservation({
            reservationId: reservationId,
            userId: user.id
        }));
		setShowResDelete(false);
	};

	//toggle for modal
	const deleteReservationToggle = (e, event) => {
		e.preventDefault();
		e.stopPropagation();
        
        if (event) {
			setResToDelete(event);
		} else {
			setResToDelete(null);
		}
		setShowResDelete(!showResDelete);
	};

    const DeleteReservationModal = () => {
        return(
            <>
				{showResDelete && (
					<CustomModal onClose={deleteReservationToggle}>
						<div className="deleteRESMessage">
							Cancel your reservation for {resToDelete.date.replace('T', ' at ').slice(0, -3)}?
						</div>
						<div className="deleteRESButtons">
							<button
								type="button"
								onClick={(e) => handleReservationDelete(e, resToDelete.id)}
							>
								Confirm
							</button>
							<button type="button" onClick={(e) => deleteReservationToggle(e)}>
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
                <p className="ProfileInfoEvents">Upcoming Events: {user.events.length > 0 ? user.events.length : "None"}</p>
                <p className="ProfileInfoRes">Upcoming Reservations: {user.reservations.length > 0 ? user.reservations.length : "None"}</p>
                <button className="ProfileEditUserButton" type="button" onClick={(e) => editUserToggle(e, user)}>Edit</button>
                <button className="EventDeleteUserBut" type="button" onClick={(e) => deleteUserToggle(e, user)}>Delete</button>

                {/* USER MODALS */}
                <>{EditUserModal()}</>
                <DeleteUserModal />
            </div>
            <div className="ProfileEvents">
                <h2 className="ProfileEventsHeader">Events</h2>
                <ul className="ProfileEventsList">
                    {user.events.map((event) => (
                        <li key={event.event_id} className={`ProfileELI${event.event_id}`}>
                            <p>{event.event_name}</p>
                            <p>Registration Price: {event.registration_price}</p>
                            <p>Date: {event.event_date.replace('T', ' at ').slice(0, -3)}</p>
                            <p>Geusts: {event.guests}</p>
                            <button className="ProfileEditEventButton" type="button" onClick={(e) => editEventToggle(e, event)}>Edit</button>
                            <button className="EventDeleteBut" type="button" onClick={(e) => deleteEventToggle(e, event)}>Delete</button>
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
                            <p>Date: {reservation.date.replace('T', ' at ').slice(0, -3)}</p>
                            <button className="ProfileEditReservationButton" type="button" onClick={(e) => reservationEventToggle(e, reservation)}>Edit</button>
                            <button className="ReservationDeleteBut" type="button" onClick={(e) => deleteReservationToggle(e, reservation)}>Delete</button>
                        </li>
                    ))}

                    {/* RESERVATION MODALS */}
                    <EditReservationModal />
                    <DeleteReservationModal />
                </ul>
            </div>
        </div>
    )
};

export default ProfilePage;