const express = require('express');
const router = express.Router();
const get = require('../utils/request');
const word = require('../utils/word');

let searchURL = 'https://fr.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentURL = 'https://fr.wikipedia.org/w/api.php?action=query&prop=extracts&format=jsonfm&titles=';

/* GET users listing. */
router.get('/:search?', function(req, res, next) {
    if(req.params.search){
        let url = searchURL+req.params.search;
        let words = JSON.parse(get.getJson(url))[1];
        console.log("Mots recup : " +words);
        let def = JSON.parse(get.getJson(url))[2];
        console.log("Def recup : "+def);
        word.checkRelationWithName(words, def);
        res.json(word.checkRelationWithName(words, def))
     }else{
        res.json("No search param");
    }

});

module.exports = router;
