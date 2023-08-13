const contactsOprations = require('../../models/contacts');

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContacts = await contactsOprations.removeContact(contactId);
  if (updatedContacts !== null) {
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = removeById;
