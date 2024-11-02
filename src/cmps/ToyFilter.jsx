import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service.js";
import { toyService } from "../services/toy.service.js";

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const toyLabels = toyService.getToyLabels()
  const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    debouncedOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (type === "number") value = +value || ''
    setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
  }

  return (
    <section className="toy-filter">
      <h2>Toys Filter</h2>
      <div className="toy-filter-inputs-btn">
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
            name="labels"
            value={filterByToEdit.labels || ""}
            onChange={handleChange}
          >
            <option value="">All Labels</option>
            {toyLabels.map(label => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>

          <select name="inStock" value={filterByToEdit.inStock || ''} onChange={handleChange}>
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Not in stock</option>
        </select>

        </form>
        <Link className="toy-filter-btn" to="/toy/edit">
          Add Toy
        </Link>
      </div>
    </section>
  );
}
