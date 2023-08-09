const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return updatedContacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: nanoid() };
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.map((item) =>
    item.id === contactId ? { ...item, ...body } : item
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return updatedContacts.find((item) => item.id === contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
