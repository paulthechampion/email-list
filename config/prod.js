// prod.js production keys here keys here

//dev.js don't commit this!!!

module.exports ={
    googleClientID : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    cookieKey:process.env.COOKIE_KEY,
    mongoKey:process.env.MONGO_URI,
    stripePublishableKey : process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
}
