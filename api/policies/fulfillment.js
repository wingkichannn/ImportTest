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

app.intent('user provides surgery', (conv, params, req) => {
    surgery = params.surgery;
    console.log("The surgery is "+surgery);
    return conv.close(req.queryResult.fulfillmentText);
    
  	
});
app.intent('user provides doctor name', (conv, params, req) => {
    doctorName = params.doctorName;
    console.log("The doctor name is "+surgery);
    return conv.close(req.queryResult.fulfillmentText);
    
});
app.intent('user provides hospital', (conv, params) => {
    
    hospital = params.hospital;
    console.log("The doctor name is "+hospital);
    return conv.close(req.queryResult.fulfillmentText);

});
//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
module.exports = app;