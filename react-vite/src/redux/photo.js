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
    type: ALL_PHOTOS,
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

//delete a photo
export const deleteEvent = (photoId) => async (dispatch) => {
    const request = await fetch(`api/events/${photoId}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "photoUrl": info.date,
            "caption": info.players 
        })
    });
    const response = await request.json();
    dispatch(allPhotos());
    return response;
};

//delete a photo //!NOT DONE NEEDS TO BE FIXED!!!!!!!!!
export const deletePhoto = (photoId) => async (dispatch) => {
    const request = await fetch(`api/events/${photoId}`,{method:"DELETE"});
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
    
};

export default photosReducer;