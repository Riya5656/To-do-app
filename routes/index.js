var express = require('express');
var router = express.Router();
var todos=require('../Resource/todo');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { fname: 'Riya ', lname:'Parajuli',age:22 });
// });

router.get('/',function(req,res,next){
res.render('home',{todoslist:todos});
});

router.get('/add-to-do',function(req,res,next){
  res.render('addToDo',{Title:'Add ToDo'});
  });

  router.post('/save-to-do', function(req,res,next){
    todos.push({...req.body,_id:`00${todos.length}`}); //... (spread operator)
    res.redirect('/');
  })
router.get ('/delete-to-do/:index',function(req,res,next){
console.log(req.params.index)
todos.splice(req.params.index, 1);
res.redirect('/');

})

router.get('/open-update-form/:id',function(req,res,next){
  const todo1 =todos.find(todo=> todo.id === req.params.id)
  res.render('editToDo',{todo:todo1});
})

router.post('/update-to-do/:id',function(req,res,next){
  const index=todos.findIndex(todo=>todo.id === req.params.id);
  todos.splice(index,1,{...req.body,id: req.params.id});
  res.redirect('/');
})

module.exports = router;

