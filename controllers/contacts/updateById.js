const contactsOprations = require('../../models/contacts');

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await contactsOprations.updateContact(contactId, req.body);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = updateById;
