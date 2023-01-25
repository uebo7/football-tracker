const express = require('express')
const router = express.Router()
const Player = require('../models/player')

//index

router.get('/players', function(req, res) {
    Player.find({}, function(error, allPlayers) {
        res.render('players/index.ejs', {
            title: 'Players',
            players: allPlayers
        })
    })
})

//new

router.get('/players/new', function(req, res) {
    res.render('players/new.ejs', {
        title: 'Add New Player'
    })
})

//delete

router.delete('/players/:id', function(req, res) {
    Player.findByIdAndDelete(req.params.id, function(error, deletedPlayer) {
        res.redirect('/players')
    })
})

//update

router.put('/products/:id', function(req, res) {
    Player.findByIdAndUpdate(req.params, req,body, 
        {
            new: true,
        },
        function(error, updatedPlayer) {
            res.redirect(`${req.params.id}`)
        }
        )
})

//create

router.post('/players', function(req, res) {
    Player.create(req.body, function(error, createdPlayer) {
        res.redirect('/players')
    })
})

//edit

router.get('/players/:id/edit', function(req, res) {
    Player.findById(req.params.id, function(error, editPlayer) {
        res.render('players/edit.ejs', {
            title: 'Edit Player',
            player: editPlayer
        })
    })
})

//show

router.get('/players/:id', function(req, res) {
    Player.findById(req.params.id, function(error, foundPlayer) {
        res.render('players/show.ejs', {
            title: 'Player Information',
            player: foundPlayer
        })
    })
})

module.exports = router