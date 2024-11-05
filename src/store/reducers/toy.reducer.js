import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const UNDO_TOY = 'UNDO_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys: state.toys }

        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }

        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }

        case UNDO_TOY:
            return { ...state, toys: [...state.lastToys] }

        case SET_FILTER_BY:
            const filterBy = { ...state.filterBy, ...action.filterBy }
            return { ...state, filterBy }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        default: return state
    }
}