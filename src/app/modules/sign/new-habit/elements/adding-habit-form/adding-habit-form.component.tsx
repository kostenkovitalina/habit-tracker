"use client";

import { useState } from "react";

const AddingHabitFormComponent = () => {
  const [habit, setHabit] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(habit);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>New habit</label>

      <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
      />

      <button type="submit">
        Add
      </button>
    </form>
  );
};

export default AddingHabitFormComponent;