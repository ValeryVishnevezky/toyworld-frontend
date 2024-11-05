import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, user, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} user={user} onRemoveToy={onRemoveToy}/>
                </li>)}
        </ul>
    )
}

