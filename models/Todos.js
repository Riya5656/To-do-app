const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const TodosSchema = new Schema({
  title:
  {
    type:String,
    required:true,
    //enum['a','b','c']
},

  description: String,
},{timestamps:true}); //created at:  //updated at
module.exports = mongoose.model('Todos', TodosSchema);