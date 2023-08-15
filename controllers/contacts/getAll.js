const contactsOprations = require('../../models/contacts');

const getAll = async (_, res) => {
  const allContacts = await contactsOprations.listContacts();
  res.json(allContacts);
};

module.exports = getAll;
