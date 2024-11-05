import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [toyId])

  function loadToy() {
    toyService.getById(toyId)
      .then(toy => setToy(toy))
      .catch(err => {
        console.log('Had issues in toy details', err)
        showErrorMsg('Cannot load toy')
        navigate('/toy')
      })
  }

  if (!toy) return <div className="loader-box"><img className="loader" src="/src/assets/svg/loader.svg" alt="loader"></img></div>

  return (
    <section className="toy-details" style={{ textAlign: 'center' }}>
      <button>
        <Link to="/toy">Back</Link>
      </button>
      <div className="toy-details-info">
        <img src="/src/assets/img/toy.png" alt="" />
      <div className="toy-details-info-txt">
      <h1>
        Toy name: <span>{toy.name}</span>
      </h1>
      <h1>
        Toy price: <span>${toy.price}</span>
      </h1>
      <h1>
        Toy inStock: <span>{toy.inStock ? 'yes' : 'no'}</span>
      </h1>
      <h1>
        Labels: <span>{toy.labels.join(' ,')}</span>
      </h1>
      <h1 className={toy.inStock ? 'green' : 'red'}>
        {toy.inStock ? 'In stock' : 'Not in stock'}
      </h1>
      </div>
      </div>
    </section>
  )
}
