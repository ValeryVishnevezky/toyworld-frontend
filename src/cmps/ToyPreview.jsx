import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {

    return (
        <article className="toy-preview-info">
            <img src="/src/assets/img/toy.png" alt="" />
            <h4>{toy.title}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* <p>Description: <span>{toy.desc.toLocaleString()}</span></p> */}
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <div>
            <Link className="toy-preview-link" to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link className="toy-preview-link" to={`/toy/${toy._id}`}>Details</Link> &nbsp; | &nbsp;
            <button className="toy-preview-delete" onClick={() => onRemoveToy(car._id)}><i className="fa-solid fa-trash-can"></i></button>
            </div>
        </article>
    )
}