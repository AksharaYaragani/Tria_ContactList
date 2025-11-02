import React from "react";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, searchTerm, onEdit, onDelete, view }) => {
  if (!contacts || contacts.length === 0) {
    return <p className="no-results">No contacts found.</p>;
  }

  return (
    <div className={`contact-list ${view}`}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          searchTerm={searchTerm}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;
