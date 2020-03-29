const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('./../models/User');
const Contact = require('./../models/Contact');
const auth = require('./../middlewear/auth');

// @route GET api/contacts
// @desc  Get all users contacts
// @access Private
router.get('/',auth, async (req,res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        return res.json(contacts);
    } catch(error) {
        console.log(error.message);
        return res.status.send('Server error');
    }
});

// @route Post api/contacts
// @desc  add new contact
// @access Private
router.post('/',[auth,
    check('name','name is required').notEmpty()
], async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,email,phone,type,user: req.user.id
        });

        const contact = await newContact.save();

        return res.json(contact);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
    
});

// @route PUT api/contacts/:id
// @desc  update a contact
// @access Private
router.put('/:id',[auth],async(req,res) => {
    const { name, email, phone, type } = req.body

    // build contact object
    const contactFields = {};
    if (name) {
        contactFields.name = name
    }
    if (email) {
        contactFields.email = email
    }
    if (phone) {
        contactFields.phone = phone
    }
    if (type) {
        contactFields.type = type
    }

    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({msg: 'Contact not found'});
        }
        // make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'})
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,{$set:contactFields},{new: true});
        res.json(contact)
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
});

// @route DELETE api/contacts/:id
// @desc  Delete a contact
// @access Private
router.delete('/:id',[auth],async(req,res) => {
    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({msg: 'Contact not found'});
        }
        // make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'})
        }


        await Contact.findByIdAndRemove(req.params.id);
        return res.json({msg: 'contact removed'})
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;