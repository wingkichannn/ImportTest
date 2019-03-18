/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    fulfill: async function (req, res) {
        return res.fulfillment();
    }
    
  

};

