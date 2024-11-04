// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// const STORAGE_KEY = 'toyDB'
// const labels = [
//     'On wheels',
//     'Box game',
//     'Art',
//     'Baby',
//     'Doll',
//     'Puzzle',
//     'Outdoor',
//     'Battery Powered',
// ]

// export const toyService = {
//     query,
//     getById,
//     remove,
//     save,
//     getEmptyToy,
//     getDefaultFilter,
//     getToyLabels
// }
// _saveToys()

// function query(filterBy = {}) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (!filterBy.title) filterBy.title = ''
//             if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
//             if (!filterBy.desc) filterBy.desc = ''
//             if (!filterBy.labels) filterBy.labels = ''
//             if (filterBy.inStock === 'true') filterBy.inStock = true
//             else if (filterBy.inStock === 'false') filterBy.inStock = false
//             else filterBy.inStock = ''
//             const titleRegExp = new RegExp(filterBy.title, 'i')
//             const descRegExp = new RegExp(filterBy.desc, 'i')
//             return toys.filter(toy =>
//                 titleRegExp.test(toy.title) &&
//                 toy.price <= filterBy.maxPrice &&
//                 descRegExp.test(toy.desc) &&
//                 (filterBy.labels === '' || toy.labels.includes(filterBy.labels)) &&
//                 (filterBy.inStock === '' || toy.inStock === filterBy.inStock)
//             )
//         })
// }

// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId)
// }

// function remove(toyId) {
//     return storageService.remove(STORAGE_KEY, toyId)
// }


// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         toy.owner = userService.getLoggedinUser()
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }

// function getEmptyToy() {
//     return {
//         title: '',
//         price: '',
//         labels: '',
//         inStock: ''
//     }
// }

// function getDefaultFilter() {
//     return { title: '', maxPrice: '', labels: '', inStock: '' }
// }

// function getToyLabels() {
//     return [...labels]
// }

// // TEST DATA
// function _saveToys() {
//     const toysFromStorage = utilService.loadFromStorage(STORAGE_KEY)
//     if (!toysFromStorage) {
//         const toys = [
//             {
//                 "_id": "t102",
//                 "title": "Wooden Puzzle Set",
//                 "price": 45,
//                 "labels": [
//                     "Puzzle",
//                     "Outdoor"
//                 ],
//                 "createdAt": 1631032801011,
//                 "inStock": true
//             },
//             {
//                 "_id": "t113",
//                 "title": "Wooden Play Kitchen",
//                 "price": 75,
//                 "labels": [
//                     "Baby"
//                 ],
//                 "createdAt": 1631043801011,
//                 "inStock": true
//             },
//             {
//                 "_id": "t101",
//                 "title": "Talking Doll",
//                 "price": 100,
//                 "labels": [
//                     "Doll",
//                     "Baby"
//                 ],
//                 "createdAt": 1631031801011,
//                 "inStock": false
//             },
//             {
//                 "_id": "t108",
//                 "title": "Soft Plush Teddy Bear",
//                 "price": 20,
//                 "labels": [
//                     "Baby"
//                 ],
//                 "createdAt": 1631038801011,
//                 "inStock": true
//             },
//             {
//                 "_id": "t110",
//                 "title": "Remote Control Helicopter",
//                 "price": 95,
//                 "labels": [
//                     "Battery Powered",
//                     "Outdoor"
//                 ],
//                 "createdAt": 1631040801011,
//                 "inStock": false
//             },
//             {
//                 "_id": "t103",
//                 "title": "Remote Control Car",
//                 "price": 79,
//                 "labels": [
//                     "On wheels",
//                     "Battery Powered",
//                     "Outdoor"
//                 ],
//                 "createdAt": 1631033801011,
//                 "inStock": true
//             },
//             {
//                 "_id": "t114",
//                 "title": "Racing Car Set",
//                 "price": 70,
//                 "labels": [
//                     "On wheels"
//                 ],
//                 "createdAt": 1631044801011,
//                 "inStock": false
//             },
//             {
//                 "_id": "t117",
//                 "title": "Outdoor Playhouse",
//                 "price": 120,
//                 "labels": [
//                     "Outdoor"
//                 ],
//                 "createdAt": 1631047801011,
//                 "inStock": true
//             },
//             {
//                 "title": "newnew",
//                 "price": 100,
//                 "labels": [
//                     "Doll",
//                     "Outdoor",
//                     "On wheels",
//                     "Box game"
//                 ],
//                 "_id": "XkKeI",
//                 "createdAt": 1730356890733,
//                 "inStock": true
//             },
//             {
//                 "title": "new",
//                 "price": 100,
//                 "labels": [
//                     "Outdoor",
//                     "Art"
//                 ],
//                 "_id": "2aOQL",
//                 "createdAt": 1730228205688,
//                 "inStock": true
//             },
//             {
//                 "_id": "t107",
//                 "title": "Miniature Train Set",
//                 "price": 40,
//                 "labels": [
//                     "On wheels",
//                     "Box game"
//                 ],
//                 "createdAt": 1631037801011,
//                 "inStock": false
//             },
//             {
//                 "_id": "t115",
//                 "title": "Glow-in-the-Dark Stars",
//                 "price": 15,
//                 "labels": [
//                     "Art"
//                 ],
//                 "createdAt": 1631045801011,
//                 "inStock": true
//             },
//             {
//                 "_id": "t116",
//                 "title": "Electronic Drum Kit",
//                 "price": 85,
//                 "labels": [
//                     "Battery Powered"
//                 ],
//                 "createdAt": 1631046801011,
//                 "inStock": false
//             },
//             {
//                 "_id": "t111",
//                 "title": "Educational Alphabet Blocks",
//                 "price": 25,
//                 "labels": [
//                     "Baby"
//                 ],
//                 "createdAt": 1631041801011,
//                 "inStock": false
//             },
//             {
//                 "_id": "t106",
//                 "title": "Dancing Robot",
//                 "price": 65,
//                 "labels": [
//                     "Battery Powered"
//                 ],
//                 "createdAt": 1631036801011,
//                 "inStock": true
//             },
//             {
//                 "title": "asas!!",
//                 "price": 100,
//                 "labels": [
//                     "Art",
//                     "On wheels"
//                 ],
//                 "_id": "1BxLH",
//                 "createdAt": 1721054345215,
//                 "inStock": true
//             },
//             {
//                 "_id": "t109",
//                 "title": "3D Jigsaw Puzzle",
//                 "price": 35,
//                 "labels": [
//                     "Puzzle"
//                 ],
//                 "createdAt": 1631039801011,
//                 "inStock": true
//             }
//         ]
//         utilService.saveToStorage(STORAGE_KEY, toys)
//     }
// }


