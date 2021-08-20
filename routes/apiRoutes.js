const _ = require("lodash")
const mongoose = require('mongoose');
const {Path} = require("path-parser")
const {URL} = require("url")
const express = require("express")
const app = express()
const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../middlewares/requireLogin")
const requireCredits = require("../middlewares/reuireCredits")
const Survey = require("../models/Survey");
const Mailer = require("../services/Mailer")
const surveyTemplate = require("../services/emailTemplate/surveyTemplates")


app.post("/stripe",requireLogin,async(req,res)=>{

 const charge= await stripe.charges.create({
                amount:500,
                currency:"usd",
                description:"$5 for 5 credits",
                source: req.body.id,
    }) 
   
    req.user.credits +=5
    const user = await req.user.save()
    res.send(user)
})

app.get("/surveys", requireLogin,async(req,res)=>{
   const surveys= await Survey.find({_user:req.user.id})
    // .select({recipients:false})

   res.send(surveys)
})

app.post("/surveys",requireLogin,requireCredits,async(req,res)=>{
    const {title, subject, body, recipients} = req.body

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
        // recipients: recipients.split(",").map(email =>{return{email:email}})
        _user: req.user.id,
        dateSent: Date.now()
    })
    //ES15 syntax above, peep it? yeah thaz ett
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
  
        res.send(user);
      } catch (err) {
          console.log(err)
        res.status(422).send(err);
      }

})

app.post("/surveys/webhooks",(req,res)=>{
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()    //remove every undefined space in the array
      .uniqBy('email', 'surveyId')  //making the array to be unique
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: Date.now()
          }
        ).exec();
      console.log("done")})
      .value();

    res.send({})
    
})
app.get("/surveys/:surveyId/:choice",(req,res)=>{
    console.log("redirect")
    res.send("<div>Thanks for voting!</div>")
})



module.exports=app
 