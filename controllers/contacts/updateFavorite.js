const { Contact } = require('../../models/contact');

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (updatedContact) {
        res.json(updatedContact);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
};

module.exports = updateFavorite;

