import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter
}
_saveToys()

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.title) filterBy.title = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            if (!filterBy.desc) filterBy.desc = ''
            const titleRegExp = new RegExp(filterBy.title, 'i')
            const descRegExp = new RegExp(filterBy.desc, 'i')
            return toys.filter(toy =>
                titleRegExp.test(toy.title) &&
                toy.price <= filterBy.maxPrice &&
                descRegExp.test(toy.desc)
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        title: '',
        price: '',
        desc: '',
    }
}

function getDefaultFilter() {
    return { title: '', maxPrice: '', desc: '' }
}

// TEST DATA
function _saveToys() {
    const toysFromStorage = utilService.loadFromStorage(STORAGE_KEY)
    if (!toysFromStorage) {
        const toys = [
            {
                "_id": "WepLV",
                "title": "Puki Car",
                "desc": "Toy description",
                "price": 3466,
                "owner": {
                    "_id": "u101",
                    "fullname": "Puki Ja"
                }
            },
            {
                "_id": "Du2qd",
                "title": "Susita-418",
                "price": 1239,
                "desc": "Toy description",
                "owner": {
                    "fullname": "admin",
                    "_id": "Uo93j",
                    "isAdmin": true
                }
            },
            {
                "_id": "fGOU1",
                "title": "Susita-397",
                "price": 879,
                "desc": "Toy description",
                "owner": {
                    "fullname": "admin",
                    "_id": "Uo93j",
                    "isAdmin": true
                }
            },
            {
                "_id": "d3HIR",
                "title": "Susita-336",
                "price": 4423,
                "desc": "Toy description",
                "owner": {
                    "fullname": "Puki Ja",
                    "_id": "u101"
                }
            },
            {
                "_id": "lqIQG",
                "title": "Susita-65",
                "price": 1234,
                "desc": "Toy description",
                "owner": {
                    "fullname": "Kiki Ki",
                    "_id": "6iykr"
                }
            },
            {
                "_id": "U83y4",
                "title": "Susita-892",
                "price": 7586,
                "desc": "Toy description",
                "owner": {
                    "_id": "6iykr",
                    "fullname": "Kiki Ki"
                }
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}


