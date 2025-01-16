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

function AllPhotosPage(){
    const dispatch = useDispatch();

    const {photos, user} = useSelector((state) => {
        return{ 
        photos: state.photos.allPhotos,
        user: state.session.user,
        }
    });
    

    useEffect(() => {
        console.log("USE EFFECT TEST")
            dispatch(allPhotos())
            dispatch(getUserById(user.id))
        },[dispatch]);
    console.log("EVENTS FRONT PHOTO=", photos, "USER= ", user)

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
    return(
        <div className="AllPhotosBox">
            <h2 className="AllPhotosHeader">Club Photos</h2>
            <ul className="AllPhotosList">
                {photos.map((photo) => (
                    <li key={photo.id} className={`PhotoLI${photo.id}`}>
                        <Link to={`/photos/${photo.id}`}>
                            <img src={photo.photo_url} alt="Club Photo"></img>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllPhotosPage;
