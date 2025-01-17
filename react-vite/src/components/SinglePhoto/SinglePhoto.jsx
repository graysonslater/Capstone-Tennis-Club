/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserById } from "../../redux/session";
import { onePhoto, deletePhoto, editPhoto } from "../../redux/photo";
import CustomModal from "../../context/CustomModal";
import "./SinglePhoto.css"


/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function SinglePhotoPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {photoId} = useParams();
    const {photo, user} = useSelector((state) => {
        return{ 
        photo: state.photos.onePhoto,
        user: state.session.user,
        }
    });
    

    useEffect(() => {
            dispatch(onePhoto(photoId))
            dispatch(getUserById(user.id))
        },[dispatch]);
    // console.log("EVENTS FRONT PHOTO=", photo, "USER= ", user)

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
		await dispatch(deletePhoto(photoId));
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
					<CustomModal onClose={(e) => deletePhotoToggle(e, photo)}>
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
//*                             EDIT EVENT
/***********************************************************************************************************************************************/
    
	const [showEdit, setShowEdit] = useState(false);
	const [photoToEdit, setPhotoToEdit] = useState();
	const [caption, setCaption] = useState();

	//event handler for edit
	const handleEdit = (e, photoId) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(editPhoto({
			photoId: photoId,
			caption: caption
		}))
		setShowEdit(false);
	}

	//toggle for modal
	const editPhotoToggle = (e, photo) => {
		e.preventDefault();
		e.stopPropagation();
		if (photo) {
			setPhotoToEdit(photo);
			setCaption(photo.caption);
		} else {
			setPhotoToEdit(null);
			
		}
		setShowEdit(!showEdit);
	};

	const EditPhotoModal = () => {
		return(
			<>
				{showEdit && (
					<CustomModal onClose={(e) => editPhotoToggle(e, photo)}>
						<div className="ProfilePhotoTitle">Edit your caption</div>
						<div className="ProfilePhotoButtons">
							<label className="PhotoEventLabel">
								<input
									type="text"
									value={caption}
									onChange={(e) => setCaption(e.target.value)}
								/>
							</label>
							<button
								type="button"
								onClick={(e) => handleEdit(e, photoToEdit.id)}
							>
								Confirm
							</button>
							<button type="button" onClick={editPhotoToggle}>
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
        <div className="OnePhotoBox">
            <img className="OnePhoto" src={photo.photo_url} alt="Club Photo"></img>
            <div className="PhotoCaption">{photo.caption}</div>
            {user.id === photo.user_id && (
				<div className="PhotoButtons">
					<button className="DeletePhotoBut" type="button" onClick={(e) => deletePhotoToggle(e, photo)}>Delete</button>
					<button className="editPhotoBut" type="button" onClick={(e) => editPhotoToggle(e, photo)}>Edit</button>
				</div>				
			)}
			<DeleteEventModal />
			{EditPhotoModal(photo)}
        </div>
    )
}

export default SinglePhotoPage;