import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { toyAction } from "../store/actions/toy.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { Link, useNavigate, useParams } from "react-router-dom";

export function ToyEdit() {
  const navigate = useNavigate();
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy());
  const { toyId } = useParams();
  const labels = toyService.getToyLabels();

  useEffect(() => {
    if (toyId) loadToy();
  }, [toyId]);

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToyToEdit(toy))
      .catch((err) => {
        console.log("Had issues in toy edit", err);
        navigate("/toy");
      });
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target;
    value = type === "number" ? +value : value;
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }));
  }

  function handleLabelChange({ target }) {
    const value = target.value;
    setToyToEdit((prevToy) => {
      let newLabels;
      if (prevToy.labels.includes(value)) {
        newLabels = prevToy.labels.filter((label) => label !== value);
      } else {
        newLabels = [...prevToy.labels, value];
      }
      return { ...prevToy, labels: newLabels };
    });
  }

  function onSaveToy(ev) {
    ev.preventDefault();
    if (!toyToEdit.price) toyToEdit.price = 100;
    toyAction
      .saveToy(toyToEdit)
      .then(() => {
        showSuccessMsg("Toy Saved!");
        navigate("/toy");
      })
      .catch((err) => {
        console.log("Had issues in toy details", err);
        showErrorMsg("Had issues in toy details");
      });
  }

  const { title, price, labels: toyLabels } = toyToEdit;

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? "Edit" : "Add"} Toy</h2>

      <form className="toy-edit-form" onSubmit={onSaveToy}>
        <div className="toy-edit-form-inputs">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title..."
            value={title}
            onChange={handleChange}
          />
        </div>

        <div className="toy-edit-form-inputs">
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter price"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="toy-edit-form-inputs">
          <label htmlFor="labels">Labels:</label>
          <div className="toy-edit-form-inputs-checkbox-list">
            {labels.map((label) => (
              <div key={label} className="toy-edit-form-inputs-checkbox">
                <input
                  type="checkbox"
                  id={label}
                  value={label}
                  checked={toyLabels.includes(label)}
                  onChange={handleLabelChange}
                />
                <label htmlFor={label}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button className="toy-edit-btn">
            {toyToEdit._id ? "Save" : "Add"}
          </button>
          <Link className="toy-edit-btn" to="/toy">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
