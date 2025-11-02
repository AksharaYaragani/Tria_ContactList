import React, { useState } from "react";
const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const ContactCard = ({ contact, searchTerm, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(contact);
  const handleSave = (e) => {
    e.preventDefault();
    if (typeof onEdit === "function") {
      onEdit(form);
    } else {
      console.warn("onEdit not provided");
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(contact.id);
    } else {
      console.warn("onDelete not provided");
    }
  };
  if (isEditing) {
    return (
      <div className="contact-card edit-mode fade-in">
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <div className="card-actions">
            <button type="submit" className="edit-btn">
              💾 Save
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => setIsEditing(false)}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="contact-card fade-in">
      <h3>{highlightMatch(contact.name, searchTerm)}</h3>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          ✏️ Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
