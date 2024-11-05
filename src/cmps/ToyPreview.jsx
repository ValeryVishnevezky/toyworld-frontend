import { Link } from "react-router-dom";

export function ToyPreview({ toy, user, onRemoveToy }) {

    return (
        <article className="toy-preview-info">
            <img src="/src/assets/img/toy.png" alt="" />
            <h4>{toy.title}</h4>
            <p>Price: <span>₪{toy.price.toLocaleString()}</span></p>
            <div>
            <Link className="toy-preview-link" to={`/toy/${toy._id}`}>Details</Link>
            {user && user.isAdmin && (
                <>
                &nbsp; | &nbsp; <Link className="toy-preview-link" to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
                <button className="toy-preview-delete" onClick={() => onRemoveToy(toy._id)}><i className="fa-solid fa-trash-can"></i></button>
                </>
            )}
            </div>
        </article>
    )
}