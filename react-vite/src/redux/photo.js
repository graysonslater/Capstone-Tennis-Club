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
    // console.log("PHOTO STORE TEST")
    const request = await fetch("/api/photos");
    const response = await request.json();
    // console.log("PHOTO STORE RESPONSE= ",response)
    dispatch(allPhotosAO(response));
    return response;
};

//get one photo
export const onePhoto = (photoId) => async (dispatch) => {
    console.log("ONE PHOTO STORE TEST")
    const request = await fetch(`/api/photos/${photoId}`);
    const response = await request.json();
    console.log("ONE PHOTO STORE RESPONSE= ",response)
    dispatch(onePhotoAO(response));
    return response;
};

//delete a photo
export const deleteEvent = (photoId) => async (dispatch) => {
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
            return {...state, allPhotos: action.object};
        case ONE_PHOTO:
            return {...state, onePhoto: action.object }
        default:
            return state;
    }
};

export default photosReducer;