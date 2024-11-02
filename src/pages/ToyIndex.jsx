import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyAction } from '../store/actions/toy.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        toyAction.loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        toyAction.setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeCarOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    return (
        <div>
            <main>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    />
                    : <div className="loader-box"><img className="loader" src="/src/assets/svg/loader.svg" alt="loader"></img></div>
                }
                <hr />
            </main>
        </div>
    )
}

