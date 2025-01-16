/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const ALL_PHOTOS = "photos/getAllPhotos"
const allPhotosAO = (photos) => ({
    type: ALL_PHOTOS,
    payload: photos
});

/***********************************************************************************************************************************************/
//*                             THUNKS
/***********************************************************************************************************************************************/

//get all Photos
export const allPhotos = () => async (dispatch) => {
    const request = await fetch("/api/photos");
    const response = await request.json();
    dispatch(allPhotosAO(response));
    return response;
};

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {photos: null, allPhotos: [], usersPhotos: []};

function photosReducer(state = initialState, action){
    switch (action.type) {
        case ALL_PHOTOS:
            return {...state, allPhotos: []}
        default:
            return state;
    }
};

export default photosReducer;