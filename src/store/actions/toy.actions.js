import { toyService } from "../../services/toy.service.js";
import { showSuccessMsg } from "../../services/event-bus.service.js";
import { SET_TOYS, REMOVE_TOY, UNDO_TOY, ADD_TOY, UPDATE_TOY, SET_FILTER_BY, SET_IS_LOADING } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export const toyAction = {
    loadToys,
    removeToy,
    setFilterBy,
    saveToy
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
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
      .catch(err => {
        store.dispatch({ type: UNDO_TOY })
        console.log('toy action -> Cannot remove toy', err)
        throw err
      })
}

function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
      .then(toyToSave => {
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
      })
      .catch(err => {
        console.log('toy action -> Cannot save toy', err)
        throw err
      })
  }