/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserById } from "../../redux/session";
import { allPhotos } from "../../redux/photo";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";

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
//*                             POST AN IMAGE
/***********************************************************************************************************************************************/

    const [showCreate, setShowCreate] = useState(false);
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
        setShowCreate(false);
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
        setShowCreate(!showCreate);
    };

    const EditEventModal = () => {
        return(
            <>
                {showCreate && (
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
