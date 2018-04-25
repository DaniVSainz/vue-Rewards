var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PrizeSchema = new Schema({
  name: {type: String,required: true},
  description: {type: String,required: true},
  image_url: {type: String,required: true},
  quantity: {type:Number,required: true, min:0,}
});

var Prize = mongoose.model("Post", PrizeSchema);
module.exports = Prize;