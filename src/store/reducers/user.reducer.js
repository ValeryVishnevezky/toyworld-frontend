import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

const initialState = {
    loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedInUser: action.user }

        case UPDATE_USER:
            return { ...state, loggedInUser: action.user }

        default: return state;
    }
}