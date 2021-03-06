const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

router.get("/", function(req, res){
    burger.selectAll(function(data){
        var obj = {
            burgers: data
        };
        console.log(obj);
        res.render('index', obj);
    });
});

router.post('/api/burgers', function(req, res){
    burger.insertOne(['burger_name', 'devoured'],
        [req.body.burger_name, req.body.devoured],
        function(result){
            res.json({id: result.insertId});
        });
});

router.put('/api/burgers/:id', function(req, res){
    var condition = 'id = ' + req.params.id;
    console.log('condition: ', condition);

    burger.updateOne({
        devoured: req.body.devoured},
        condition, function(result) {
            if(result.changedRows ==0){
                return res.status(404).end();
            }else {
                // return res.redirect("/");
                return res.send(200);
            }
    });
});

module.exports = router;