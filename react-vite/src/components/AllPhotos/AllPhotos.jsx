/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserById } from "../../redux/session";
import { allPhotos, postPhoto, onePhoto } from "../../redux/photo";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import CustomModal from "../../context/CustomModal";
import { useNavigate } from "react-router-dom";
import "./AllPhotos.css"

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function AllPhotosPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {photos, user} = useSelector((state) => {
        return{ 
        photos: state.photos.allPhotos,
        user: state.session.user,
        }
    });
    // console.log("EVENTS FRONT PHOTO=", photos, "USER= ", user)

    useEffect(() => {
        dispatch(allPhotos())
        dispatch(getUserById(user.id))
        },[dispatch, onePhoto]);
    

/***********************************************************************************************************************************************/
//*                             POST AN IMAGE
/***********************************************************************************************************************************************/

    const [showCreate, setShowCreate] = useState(false);
    const [photoUrl, setPhotoUrl] = useState();
    const [caption, setCaption] = useState();

    //event handler for edit
    const handlePostPhoto = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newPhoto = await dispatch(postPhoto({
            photoUrl: photoUrl,
            caption: caption
        }))
        
        navigate(`/photos/${newPhoto.id}`)
    }

    //toggle for modal
    const postPhotoToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowCreate(!showCreate);
    };

    const PostPhototModal = () => {
        return(
            <>
                {showCreate && (
                    <CustomModal onClose={(e) => postPhotoToggle(e)}>
                        <div className="PostPhotoTitle">Submit your photo with a caption</div>
                        <div className="PostPhotoButtons">
                            <label className="postPhotoLabel">
                                Photo URL:
                                <input
                                    type="text"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                            <label className="postPhotoLabel">
                                Caption:
                                <input
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={(e) => handlePostPhoto(e)}
                            >
                                Submit
                            </button>
                            <button type="button" onClick={postPhotoToggle}>
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
            <button className="PostButton" type="button" onClick={postPhotoToggle}>Post a photo!</button>
            {PostPhototModal()}
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
