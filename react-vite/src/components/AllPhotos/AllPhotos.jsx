/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserById } from "../../redux/session";
import { allPhotos } from "../../redux/photo";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function AllPhotos(){
    const dispatch = useDispatch();

    const {events, user} = useSelector((state) => {
        return{ 
        photos: state.photos.allPhotos,
        user: state.session.user,
        }
    });
    console.log("EVENTS FRONT events=", events, "USER= ", user)

    useEffect(() => {
            dispatch(allPhotos())
            dispatch(getUserById(user.id))
        },[dispatch]);

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    return(
        <>NEW ALL PHGOTS</>
    )
}

export default AllPhotos;
