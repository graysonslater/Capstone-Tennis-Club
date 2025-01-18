/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const ALL_PHOTOS = "photos/getAllPhotos"
const allPhotosAO = (photos) => ({
    type: ALL_PHOTOS,
    payload: photos
});

const ONE_PHOTO = "photos/getOnePhoto"
const onePhotoAO = (photo) => ({
    type: ONE_PHOTO,
    payload: photo
});

/***********************************************************************************************************************************************/
//*                             THUNKS
/***********************************************************************************************************************************************/

//get all Photos
export const allPhotos = () => async (dispatch) => {
    const request = await fetch("/api/photos/");
    const response = await request.json();
    dispatch(allPhotosAO(response));
    return response;
};

//get one photo
export const onePhoto = (photoId) => async (dispatch) => {
    const request = await fetch(`/api/photos/${photoId}`);
    const response = await request.json();
    dispatch(onePhotoAO(response));
    return response;
};

//Post a photo
export const postPhoto = (info) => async (dispatch) => {
    const request = await fetch(`/api/photos/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "photoUrl": info.photoUrl,
            "caption": info.caption 
        })
    });
    const response = await request.json();
    dispatch(onePhoto(response.id));
    return response;
};

//Edit a photo
export const editPhoto = (info) => async (dispatch) => {
    const request = await fetch(`/api/photos/${info.photoId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "caption": info.caption 
        })
    });
    const response = await request.json();
    dispatch(onePhoto(response.id));
    return response;
};

//delete a photo //!NOT DONE NEEDS TO BE FIXED!!!!!!!!!
export const deletePhoto = (photoId) => async (dispatch) => {
    const request = await fetch(`/api/photos/${photoId}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const response = await request.json();
    dispatch(allPhotos());
    return response;
};

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {photos: null, allPhotos: [], onePhoto: []};

function photosReducer(state = initialState, action){
    switch (action.type) {
        case ALL_PHOTOS:
            return {...state, allPhotos: action.payload};
        case ONE_PHOTO:
            return {...state, onePhoto: action.payload }
        default:
            return state;
    }
    
}

export default photosReducer;