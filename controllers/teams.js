const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Player = require('../models/player')
const player = require('../models/player')

//index

router.get('/teams', function(req, res) {
    Team.find({}, function(error, allTeams) {
        res.render('teams/index.ejs', {
            teams: allTeams,
            title: 'Teams'
        })
    })
   
})

//new

router.get('/teams/new', function(req, res) {
    res.render('teams/new.ejs', {
        title: 'Add New Team'
        
    })
})

//delete

router.delete('/teams/:id', function(req, res) {
    Team.findByIdAndDelete(req.params.id, function(error, deletedTeam) {
        res.redirect('/teams')
    })
})

//update

router.put('/teams/:id', function(req, res) {
    if(req.body.playoffs === 'on') {
        req.body.playoffs = true
    } 
    else {
        req.body.playoffs = false
    }
    Team.findByIdAndUpdate(req.params.id, req.body, 
        {
            new: true,
        },
        function(error, updatedTeam) {
            res.redirect(`${req.params.id}`)
        })
})

//create

router.post('/teams', function(req, res) {
    if(req.body.playoffs === 'on') {
        req.body.playoffs = true
    } 
    else {
        req.body.playoffs = false
    }
    Team.create(req.body, function(error, createdteam) {
        res.redirect('/teams')
    })
})

//edit

router.get('/teams/:id/edit', function(req,res) {
    Team.findById(req.params.id, function(error, editTeam) {
        
        res.render('teams/edit.ejs', {
            team: editTeam,
            title: 'Edit Team'
        })
    })
})

//show

router.get('/teams/:id', function(req,res) {
    Team.findById(req.params.id, function(err, foundTeam) {
        Player.find({teamId: req.params.id}, function(error, foundPlayers) {
            
            res.render('teams/show.ejs', {
                team: foundTeam,
                index: req.params.id,
                title: 'Team Information',
                players: foundPlayers
            })
        }) 
    })
})

module.exports = router
