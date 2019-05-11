const express = require('express');
const app = express();
const emailEntryRoute = express.Router();

// Require EmailEntry model in our routes module
let EmailEntry = require('../models/EmailEntry');

// Defined store route
emailEntryRoute.route('/add').post(function (req, res) {
  let emailEntry = new EmailEntry(req.body);
  emailEntry.save()
    .then(emailEntry => {
      res.status(200).json({'emailEntry': 'emailEntry in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
emailEntryRoute.route('/').get(function (req, res) {
    EmailEntry.find(function (err, emailEntryes){
    if(err){
      console.log(err);
    }
    else {
      res.json(emailEntryes);
    }
  });
});

// Defined edit route
emailEntryRoute.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  EmailEntry.findById(id, function (err, emailEntry){
      res.json(emailEntry);
  });
});

//  Defined update route
emailEntryRoute.route('/update/:id').post(function (req, res) {
    EmailEntry.findById(req.params.id, function(err, emailEntry) {
    if (!emailEntry)
      return next(new Error('Could not load Document'));
    else {
        emailEntry.person_name = req.body.person_name;
        emailEntry.emailEntry_name = req.body.emailEntry_name;
        emailEntry.emailEntry_gst_number = req.body.emailEntry_gst_number;

        emailEntry.save().then(emailEntry => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
emailEntryRoute.route('/delete/:id').get(function (req, res) {
    EmailEntry.findByIdAndRemove({_id: req.params.id}, function(err, emailEntry){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = emailEntryRoute;
