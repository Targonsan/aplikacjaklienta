var express = require('express');
const zleceniaModels=require('../models/zlecenia');
const logins=require('../models/cos');

var router = express.Router();

/* GET home page. */

router.get('/', (req, res, next)=> {
 res.redirect('/news')
});

module.exports = router;
