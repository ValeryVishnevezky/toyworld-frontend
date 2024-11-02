// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { utilService } from "../services/util.service.js";

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300));

  useEffect(() => {
    onSetFilter.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === "number" ? +value : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
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
          value={filterByToEdit.title}
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

        <input
          type="text"
          id="desc"
          name="desc"
          placeholder="By description"
          value={filterByToEdit.desc}
          onChange={handleChange}
        />
      </form>
      <Link className="toy-filter-btn" to="/toy/edit">Add Toy</Link>
      </div>
    </section>
  );
}
