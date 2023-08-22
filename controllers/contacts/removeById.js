const { Contact } = require('../../models/contact');


const removeById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContacts = await Contact.findByIdAndRemove(contactId);
  if (updatedContacts !== null) {
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = removeById;
