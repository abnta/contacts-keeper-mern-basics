const express = require('express');
const router = express.Router();

// @route GET api/contacts
// @desc  Get all users contacts
// @access Private
router.get('/',(req,res) => {
    res.send('get all contacts')
});

// @route Post api/contacts
// @desc  add new contact
// @access Private
router.post('/',(req,res) => {
    res.send('add a contact')
});

// @route PUT api/contacts/:id
// @desc  update a contact
// @access Private
router.put('/:id',(req,res) => {
    res.send('update a contact')
});

// @route DELETE api/contacts/:id
// @desc  Delete a contact
// @access Private
router.delete('/:id',(req,res) => {
    res.send('deleted a contact')
});

module.exports = router;