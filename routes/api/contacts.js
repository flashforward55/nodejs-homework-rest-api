const express = require('express');

const router = express.Router();
const contacts = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contacts.getContactById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: 'missing required fields' });
    return;
  }
  try {
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await contacts.removeContact(contactId);
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }
  try {
    const updatedContact = await contacts.updateContact(contactId, body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
