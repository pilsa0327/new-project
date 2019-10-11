const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');





/* GET home page. */
router.get('/', function (req, res) {
  let statusUI = auth.statusUI(req, res);+
  console.log(req.session.is_logined)
  return res.render('index', { statusUI });
});

module.exports = router;
