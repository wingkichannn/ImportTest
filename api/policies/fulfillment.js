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

var gastroscopy_summary= { 
    "A" : gastroscopy_A,
    "B" : gastroscopy_B,
    "C" : gastroscopy_C,
    
};
var gastroscopy_A= {
    "A1" : {
        "name" : "沒息肉切除", 
        "price" : 0
    },
    "A2" :{
        "name" : "<=3有息肉切除 <=1cm",
        "price" : 4700
    },
    "A3" :{
        "name" : ">3息肉切除 <=1cm",
        "price" : 6800
    },

    "A4" :{
        "name": "大粒息肉 >1cm",
        "price" : -1
    }
};

var gastroscopy_B = ["一般胃鏡", "自體熒光成像", "超細胃鏡5mm(小孩/老人)", "膠囊內鏡"];

var gastroscopy_C = ["沒有併發症/複雜/特別風險/另加手術", "中風險", "有併發症/複雜/另加手術", "急症"];


app.intent('user provides surgery', (conv, params, request) => {
    surgery = params.surgery;
    console.log("The surgery is "+surgery);
    for(var key in gastroscopy_summary){
                console.log(key);
            }
    return conv.close(request.queryResult.fulfillmentText);
    
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
app.intent('user modifies details', (conv, params) => {
   
});
// function makeOutputMessage(surgery){
//     var outputMessage;
//     for(var key in gastroscopy_summary){
//         console.log(key);
//     }
    
// };
//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
module.exports = app;