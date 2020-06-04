const express= require('express')
const router = express.Router();

//@route GET api/contacts
//@desc Get all users contacts
//@access Privte
router.get('/',(req,res)=>{
    res.send('Get all contacts')
});

//@route POST api/contacts
//@desc Add new contact
//@access Private
router.post('/',(req,res)=>{
    res.send('Add contact')
});

//@route PUT api/contact
//@desc Update contact
//@access Public
router.put('/:id',(req,res)=>{
    res.send('Update contact')
});

//@ route DELETE api/contacts
//@ desc Delete a contact
//@ access Private
router.delete('/:id',(req,res)=>{
    res.send('Delete a contact')
});

module.exports =router;