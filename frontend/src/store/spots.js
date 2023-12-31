import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const ADD_SPOT = "spots/addSpot";
const GET_SPOT = "spots/getSpot";
const DISPLAY_USER_SPOTS = "spots/currentUserSpots";
const EDIT_SPOT = "spots/editSpot";
// const GET_SPOT_IMAGES = "spots/getSpotImages"
const DELETE_SPOT = "spots/deleteSpot";


//get spots action creator
const getAllSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots: spots.Spots,
  };
};
//add spot action creator
export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

//get spot action creator
export const getSingleSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

//get current user spots action creator
export const getAllUserSpots = (spots) => {
  return {
    type: DISPLAY_USER_SPOTS,
    spots: spots.Spots,
  };
};

//edit spot action creator
export const editUserSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot
  };
}

// //get spot images action creator
// export const spotImagesAction = (spotId, images) => ({
//   type: GET_SPOT_IMAGES,
//   payload: { spotId, images },
// });

//delete spot action creator
export const deleteSpotAction = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  }
}

//get all spots thunk action creator
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
  });
  const data = await response.json();

  dispatch(getAllSpots(data));

  return response;
};

//create spot thunk creator
export const writeSpot = (payload) => async (dispatch) => {
  let {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
    image1,
    image2,
    image3,
    image4
  } = payload;

  const spot = {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  };

  const images = [previewImage, image1, image2, image3, image4]

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    for( let i = 0; i < images.length; i++) {
      const image = images[i];
      if(image) {
        await csrfFetch(`/api/spots/${spot.id}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(image),
        })
      }
    }
    
    dispatch(addSpot(spot));
    return spot;
  }
};



//get single spot thunk creator
export const getSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "GET",
  });
  const data = await response.json();
  dispatch(getSingleSpot(data));
  return response;
};

//get user spots thunk creator
export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current", {
    method: "GET",
  });
  const data = await response.json();
  dispatch(getAllUserSpots(data));
  return response;
};

//edit spot thunk creator
export const editSpot = (payload) => async (dispatch) => {
  // const spotId = payload; //used to be payload.is.spotId
  // const newEditedSpot = payload.spot;
  // const newPreviewImage = payload.previewImage;
  const { spotId, spot: newEditedSpot, previewImage: newPreviewImage } = payload;


  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEditedSpot),
  });
      if (response.ok) {
      const spot = await response.json();
    console.log(spot)
    dispatch(editUserSpot(spot));
    return spot;
  }
// }
};

// //get spot images thunk action creator
// export const getSpotImages = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}/images`);
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(spotImagesAction(spotId, data.images));
//   } else {
//     throw new Error("couldn't get spot images")
//   }
// }

//delete spot thunk action creator
export const deleteSpot = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // const spot = await response.json();
      dispatch(deleteSpotAction(spotId));
      return spotId;
    }
  } catch (error) {
    console.error('errorrrrr', error.message);
    return null;
  }
}

const initialState = {
  allSpots: {},
  singleSpot: {},
  // spotImages: {}
};

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = Object.assign({}, state);
      newState.allSpots = action.spots;
      return newState;
    case ADD_SPOT:
      newState = Object.assign({}, state);
      newState.allSpots = action.spot;
      return newState;
    case DISPLAY_USER_SPOTS:
      newState = Object.assign({}, state);
      let newObject = {}
      action.spots.forEach(spot => {
        newObject[spot.id] = spot
      })
      newState.allSpots = newObject;
      return newState;
    case GET_SPOT:
      newState = Object.assign({}, state);
      newState.singleSpot = action.spot;
      return newState;
    // case GET_SPOT_IMAGES:
    //   newState = Object.assign({}, state);
    //   // const { spotId, images } = action.payload;
    //   newState.spotImages = {
    //     ...state.spotImages,
    //     [action.payload.spotId]: action.payload.images,
    //   }
    case DELETE_SPOT:
      console.log("DELETING SPOTTTT", action.spotId);
      newState = Object.assign({}, state);
      delete newState.allSpots[action.spotId];
      console.log("DELETE SUCCESSFUL?", newState);
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
