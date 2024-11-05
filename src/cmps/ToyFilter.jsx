import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service.js";
import { toyService } from "../services/toy.service.js";
const toyLabels = toyService.getToyLabels();

export function ToyFilter({ filterBy, user, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300));

  useEffect(() => {
    debouncedOnSetFilter.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === "number" ? +value || "" : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function handleLabelChange({ target }) {
    const selectedValue = target.value;
    setFilterByToEdit((prevFilter) => {
      const newLabels = prevFilter.labels.includes(selectedValue)
        ? prevFilter.labels.filter((label) => label !== selectedValue)
        : [...prevFilter.labels, selectedValue];
      return { ...prevFilter, labels: newLabels };
    });
  }

  return (
    <section className="toy-filter">
      <h2>Toys Filter</h2>

      <div className="toy-filter-inputs">
        <form>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="By title"
            value={filterByToEdit.title || ""}
            onChange={handleChange}
          />

          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="By max price"
            value={filterByToEdit.maxPrice || ""}
            onChange={handleChange}
          />

          <select
            name="inStock"
            value={filterByToEdit.inStock || ""}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="true">In Stock</option>
            <option value="false">Not in stock</option>
          </select>

          <div className="toy-filter-inputs-checkbox">
            {toyLabels.map((label) => (
              <div className="toy-filter-inputs-checkboxes" key={label}>
                <input
                  type="checkbox"
                  name="labels"
                  value={label}
                  checked={filterByToEdit.labels.includes(label)}
                  onChange={handleLabelChange}
                />
                <label>{label}</label>
              </div>
            ))}
          </div>
        </form>
      </div>
      {user && user.isAdmin && (
        <Link className="toy-filter-btn" to="/toy/edit">
          Add Toy
        </Link>
      )}
    </section>
  );
}
