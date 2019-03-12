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
    console.log(surgery);
    return conv.close("請輸入醫生名字");
    
  	
});
app.intent('user provides doctor name', (conv, params) => {
    doctorName = params.doctorName;
    console.log(doctorName);
    return conv.close("請輸入全單價錢");
    
});
app.intent('user provides hospital', (conv, params) => {
    
    hospital = params.hospital;
    console.log(hospital);
    return con.close("In fulfillment");

});
//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
module.exports = app;