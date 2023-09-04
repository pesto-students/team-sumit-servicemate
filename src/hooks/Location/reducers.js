import { actionTypes } from "./actions"

const initialState = {
    currentLocation: ""
}

const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_LOCATION:
            return { ...state, currentLocation: action.payload }
        default:
            return state
    }
}

export default LocationReducer