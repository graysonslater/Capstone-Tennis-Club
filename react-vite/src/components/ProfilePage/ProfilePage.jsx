/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usersEvents } from "../../redux/events";
import { usersReservations, deleteReservation } from "../../redux/reservations";



/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function ProfilePage(){
    const dispatch = useDispatch();

    const {user, events, reservations} = useSelector((state) => {
        return{
            user: state.session.user,
            events: state.events.usersEvents,
            reservations: state.reservations.usersReservations
        }
    });
    console.log("PROFILE FRONT= ",reservations)
    
    useEffect(() => {
        dispatch(usersEvents())
        dispatch(usersReservations())
    },[dispatch]);

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/


    return(
        <>
        proifile page starter
        </>
    )
};

export default ProfilePage;