module.exports = function() {

    var req = this.req;
    var res = this.res;
  
    const {WebhookClient} = require('dialogflow-fulfillment');
    const {Card, Suggestion} = require('dialogflow-fulfillment');
  
    const agent = new WebhookClient({request: req, response: res});
  
    // function welcome (agent) {
    //   agent.add(`Welcome to my agent!`);
    // }
  
    // function fallback (agent) {
    //   agent.add(`I didn't understand`);
    //   agent.add(`I'm sorry, can you try again?`);
    // }
  
    let intentMap = new Map();
    // intentMap.set('Default Welcome Intent', welcome);
    // intentMap.set('Default Fallback Intent', fallback);
    // // intentMap.set('<INTENT_NAME_HERE>', yourFunctionHandler);
    // // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
    // agent.handleRequest(intentMap);

    intentMap.set('user provides surgery', (agent) => {
        let conv = agent.conv();
        let params = agent.parameters;
        surgery = params.surgery;
        console.log("The surgery is "+surgery);
        console.log("********************");
       console.log("+++++++++++++++++++"+app.queryResult.fulfillmentText);
      
        return conv.close('請輸入負責手術的醫生名字，如不知道請輸入"0"**');
        
    });
    intentMap.set('user provides doctor name', (agent) => {
        let conv = agent.conv();
        let params = agent.parameters;
        doctorName = params.doctorName;
        console.log("The doctor name is "+doctorName);
        // getFulfillmentText(agent);
        return conv.close('請問醫院名稱**');
        
    });
    intentMap.set('user provides hospital', (agent) => {
        let conv = agent.conv();
        let params = agent.parameters;
        hospital = params.hospital;
        console.log("The hospital is "+hospital);
       
        return conv.close('請輸入全單價錢(包括所有醫生/醫院收費)**');
    
    });
    intentMap.set('user provides price', (conv,params) => {
        let conv = agent.conv();
        price = params.price;
        console.log("The price is "+ price);
        // for(var key in surgery_summary)break;
        // var temp = surgery_summary[key];
        // console.log("11111111."+temp);
        // // var output = "所以，你地案例為下：\n"
        // // // console.log(output);
        // // console.log("@@@@@@@@");
        // // console.log(gastroscopy_summary.B);
        // // for(var key in gastroscopy_summary){
        // //     var temp = gastroscopy_summary[key];
        // //     console.log("*******"+temp);
        // //    console.log(temp[1].name);
        // //    const optionsList = list.map(item => Object.values(item)[0]);
        // // }
        // var count = 0;
        // for(var key in gastroscopy_summary){
        //     output += (abc[count] +": "+gastroscopy_summary[key][1].name+"\n");
        //     count++;
        // }
        // console.log(output);
        return conv.close("Display the surgery summary");
    
    });
    intentMap.set('user modifies details', (agent) => {
        let conv = agent.conv();
       
    });

    agent.handleRequest(intentMap);
  }