const contactsOprations = require('../../models/contacts');

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsOprations.getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = getById;
