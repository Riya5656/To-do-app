var express = require('express');
var router = express.Router();
var todos=require('../Resource/todo');
const Todos= require('../models/Todos');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { fname: 'Riya ', lname:'Parajuli',age:22 });
// });

router.get('/',async function(req,res,next){
  const todos=await Todos.find();
  console.log(todos);
  res.render('home',{todoslist:todos});
});

router.get('/add-to-do',function(req,res,next){
  res.render('addToDo',{Title:'Add ToDo'});
  });

  router.post('/save-to-do', async function(req,res,next){

// const todo=new Todos({
//   title:req.body.title,
//   description:req.body.description
// });
// //await todo.save();

// todo.save().then(() =>console.log('todos inserted')).catch(()=>console.log('error'));

    await Todos.insertMany([{title: req.body.title, description:req.body.description}]);
    //todos.push({...req.body,_id:`00${todos.length}`}); //... (spread operator)
    res.redirect('/');
  })
router.get ('/delete-to-do/:id',async function(req,res,next){
// console.log(req.params.index)
// todos.splice(req.params.index, 1);
await Todos.remove({_id:req.params.id});
res.redirect('/');

})

router.get('/open-update-form/:id',async function(req,res,next){
  const todo1=await Todos.findOne({_id:req.params.id});
  //const todo1 =todos.find(todo=> todo.id === req.params.id)
  res.render('editToDo',{todo:todo1});
})

router.post('/update-to-do/:id',async function(req,res,next){
  // const index=todos.findIndex(todo=>todo.id === req.params.id);
  // todos.splice(index,1,{...req.body,id: req.params.id});
  await Todos.updateOne({_id:req.params.id},{$set:{title: req.body.title, description:req.body.description}});
  res.redirect('/');
})

module.exports = router;

