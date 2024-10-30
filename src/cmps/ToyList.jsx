import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(car._id)}>x</button>
                        <button onClick={() => onEditToy(car)}>Edit</button>
                    </div>
                </li>)}
        </ul>
    )
}

