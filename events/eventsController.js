const express = require('express');
const router = express.Router();
const Event = require('./Event');

router.post('/events/save', (req, res) => {
    let date = req.body.date;
    let type = req.body.inputType;

    Event.findOne({ where: { day: date }}).then(event => {
        if(event != undefined) {
            Event.update({ typeOfEvent: type }, { where: {id: event.id} }).then(() => res.redirect('/'));
        } else {
            Event.create({
                day: date, 
                typeOfEvent: type,
            }).then(() => {
                res.redirect('/');
            })
        }

    })

});

router.get('/getEvents', (req, res) => {
    Event.findAll().then((events) => {
        res.json(events);
    });
});

module.exports = router;
