const sendgrid = require("sendgrid")
const helper = sendgrid.mail
const keys = require("../config/keys")

class Mailer extends helper.Mail{
    constructor({subject, recipients}, content){
        super()
        //The super keyword is used to access and call functions on an object's parent

        this.sgApi = sendgrid(keys.sendGridKey)
        this.from_email = new helper.Email("enwerempaulo@gmail.com")
        this.subject = subject;
        this.body = new helper.Content("text/html", content)
        this.recipients = this.formatAddresses(recipients)
        
        //addContent is provided by the helper.Email
        this.addContent(this.body)
        this.addClickTracking()
        this.addRecipients()
    }
    formatAddresses(recipients){
       return recipients.map(({email})=>{
           return new helper.Email(email)
       }) 
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings()
        const clickTracking = new helper.ClickTracking(true,true)

        trackingSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackingSettings)
    }

    addRecipients(){
        const personalize = new helper.Personalization()
        this.recipients.forEach(recipient=>{
            personalize.addTo(recipient)
        })
        this.addPersonalization(personalize)
    }

    async send(){
        const request = this.sgApi.emptyRequest({
            method:"POST",
            path: "/v3/mail/send",
            body: this.toJSON()
        })

        const response = await this.sgApi.API(request)
        return response
    }
}
//helper.Mail is a class that has already been
//configured by sendgrid.mail so we extend it
// to our Mailer class

module.exports = Mailer