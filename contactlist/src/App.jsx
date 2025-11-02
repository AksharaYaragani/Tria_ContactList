import React, { useState, useMemo } from "react";
import { initialContacts } from "./data";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import AddContactForm from "./components/AddContactForm";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }, [contacts]);
  const filteredContacts = sortedContacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleAdd = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };
  const handleEdit = (updatedContact) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
  };
  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>Contact List</h1>
        <p className="subtitle"></p>
      </header>
      <div className="contact-summary">
        <span>
          Total Contacts: <strong>{contacts.length}</strong>
        </span>
        {searchTerm && (
          <span>
            Showing {filteredContacts.length} result
            {filteredContacts.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <div className="contact-section">
        <ContactList
          contacts={filteredContacts}
          searchTerm={searchTerm}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <div className="add-section">
        <h2>Add New Contact</h2>
        <AddContactForm onAdd={handleAdd} />
      </div>
    </div>
  );
};

export default App;
