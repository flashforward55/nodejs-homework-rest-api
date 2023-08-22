const { Contact } = require('../../models/contact');

const getAll = async (_, res) => {
  const allContacts = await Contact.find();
  res.json(allContacts);
};

module.exports = getAll;
