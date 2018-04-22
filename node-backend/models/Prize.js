var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PrizeSchema = new Schema({
  name: String,
  description: String,
  image_url: String,
  quantity: {type:Number, min:0,}
});

var Prize = mongoose.model("Post", PrizeSchema);
module.exports = Prize;