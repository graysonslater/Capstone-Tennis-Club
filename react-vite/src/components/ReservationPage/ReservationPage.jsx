/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation, reservationCheck } from "../../redux/reservations";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function ReservationPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const handleCreateReservation = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        //error handling for date/time
        setEditErrors({});
        let errors = {};
        if(!newPlayers)
            errors.players = "Select number of players!"
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
        await dispatch(createReservation({
            date: formattedDate,
            players: newPlayers,
        }))

        alert("Reservation created successfully")
        navigate('/profile')
    }

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

    return(
        <div className="CreateREsBox">
            <h2 className="CreateResTitle">Researve a court time!</h2>
            <div className="CreateResButtons">
                <label className="CreateResPlayers">
                    Players:
                    <input
                        type="number"
                        min='1'
                        max="4"
                        value={newPlayers}
                        onChange={(e) => setNewPlayers(e.target.value)}
                    />
                    {errors.players && (
                        <span className="ReservationErrors">{errors.players}</span>
                    )}
                </label>
                <label className="CreateResDate">
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
                <label className="CreateResDate">
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
                    onClick={(e) => handleCreateReservation(e)}
                >
                    Confirm
                </button>
                {errors.check && (
                    <span className="ReservationErrors">{errors.check}</span>
                )}
            </div>
        </div>
    )
}

export default ReservationPage;