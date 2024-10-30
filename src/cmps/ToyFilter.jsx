// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react";
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
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="By title"
          value={filterByToEdit.title}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ""}
          onChange={handleChange}
        />

        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          name="desc"
          placeholder="By description"
          value={filterByToEdit.desc}
          onChange={handleChange}
        />
      </form>
    </section>
  );
}
