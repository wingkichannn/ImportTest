'use strict';
 
//const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const {dialogflow} = require('actions-on-google');

const app = dialogflow();

var surgery;
var price;
var doctorName;
var hospital;

app.intent('user provides surgery', (conv, params) => {
    surgery = params.surgery;
    console.log("The value of surgery is "+surgery);
    console.log("The params value is " +params.surgery);
  	
});
app.intent('user provides doctor name', (conv, params) => {
    doctorName = params.doctorName;

});
app.intent('user provides hospital', (conv, params) => {
    
    hospital = params.hospital;

});
//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
module.exports = app;