import { toyService } from "../../services/toy.service.js";
import { showSuccessMsg } from "../../services/event-bus.service.js";
import { SET_TOYS, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export const toyAction = {
    loadToys,
    removeToy,
    setFilterBy
}

function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}