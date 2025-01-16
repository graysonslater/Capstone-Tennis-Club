/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserById } from "../../redux/session";
import { onePhoto } from "../../redux/photo";


/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function SinglePhotoPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {photoId} = useParams();
    const {photo, user} = useSelector((state) => {
        return{ 
        photo: state.photos.onePhotos,
        user: state.session.user,
        }
    });
    

    useEffect(() => {
        console.log("USE EFFECT TEST")
            dispatch(onePhoto(photoId))
            dispatch(getUserById(user.id))
        },[dispatch]);
    console.log("EVENTS FRONT PHOTO=", photos, "USER= ", user)

/***********************************************************************************************************************************************/
//*                             DELETE PHOTO
// flask db init, flask db migrate, flask db upgrade, flask seed  all
/***********************************************************************************************************************************************/
    
    //set modal state
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [photoToDelete, setPhotoToDelete] = useState(null);
    
	//send delete to thunk
	const handleDelete = async (e, photoId) => {
		e.preventDefault();
		e.stopPropagation();
		await dispatch(deleteEvent(photoId));
        alert("Photo deleted successfully!");
		navigate("/home");
	};

	//toggle for modal
	const deletePhotoToggle = (e, photo) => {
		e.preventDefault();
		e.stopPropagation();
        
        if (photo) {
			setPhotoToDelete(photo);
		} else {
			setPhotoToDelete(null);
		}
		setShowConfirmDelete(!showConfirmDelete);
	};

    const DeleteEventModal = () => {
        return(
            <>
				{showConfirmDelete && (
					<CustomModal onClose={deletePhotoToggle(e, photo)}>
						<div className="deleteMessage">
							Delete Photo?
						</div>
						<div className="deleteButtons">
							<button
								type="button"
								onClick={(e) => handleDelete(e, photoToDelete.id)}
							>
								Confirm
							</button>
							<button type="button" onClick={(e) => deletePhotoToggle(e)}>
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
        <div className="OnePhotosBox">
            <img className="OnePhoto" src={photo.photo_url} alt="Club Photo"></img>
            <div className="PhotoCaption">{photo.caption}</div>
            {user.id === photo.user_id && (
                <button className="EventDeleteUserBut" type="button" onClick={(e) => deletePhotoToggle(e, photo)}>Delete</button>
            )}
            <DeleteEventModal />
        </div>
    )
}

export default SinglePhotoPage;