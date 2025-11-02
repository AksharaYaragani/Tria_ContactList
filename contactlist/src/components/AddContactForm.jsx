import React, { useState } from "react";

const AddContactForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("All fields are required!");
      return;
    }
    if (!form.email.endsWith("@mail.com")) {
      setError("Email must end with @mail.com");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }
    const newContact = {
      id: Date.now(),
      ...form,
    };

    onAdd(newContact);
    setForm({ name: "", email: "", phone: "" });
    setError("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email (must end with @mail.com)"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone (10 digits)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
