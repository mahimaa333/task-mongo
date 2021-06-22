const express  = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require("chalk");
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('connected');
}); 
mongoose.set('useFindAndModify', false);

const taskSchema = new mongoose.Schema({
    desc: String,
    completed: Boolean
});

var Task = mongoose.model("tasks",taskSchema);


var task1 = new Task({
    desc:'Buy groceries',completed:false
  });
  task1.save();
  var task2 = new Task({
    desc:'Going out for movie',completed:false
  });
  task2.save();
  var task3 = new Task({
    desc:'Drink milk',completed:true
  });
  task3.save();
  var task4 = new Task({
    desc:'Study',completed:false
  });
  task4.save();

const readTask = async () => {
    try {
        const foundTask = await Task.find({completed:false});
        if(foundTask.length === 0){
            console.log(chalk.red('No task found'));
        }
        foundTask.forEach(li => {
            console.log(chalk.blue(li.desc));
        });
    } catch (error) {
        console.log(chalk.red(error));
    }
}

const updateTask = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) return console.log('the id doesnot exist');
    await Task.findByIdAndUpdate(id, {completed: true});
    console.log(chalk.green('Updated successfully'))
}

const deleteTask =  async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) return console.log('the id doesnot exist');
     await Task.findByIdAndRemove(id);
    console.log(chalk.green('Task deleted successfully'));
}    

const deleteAllTasks = async () => {
    try {
        await Task.find().remove();
        console.log(chalk.green('Deleted all tasks successfully'));
    } catch (error) {
        console.log(chalk.red(error));
    }
} 


setTimeout(function(){ readTask(); }, 3000);
setTimeout(function(){updateTask(task2._id)}, 5000);
setTimeout(function(){ readTask(); }, 7000);
setTimeout(function(){deleteTask(task1._id)}, 9000);
setTimeout(function(){ readTask(); }, 11000);
setTimeout(function(){ deleteAllTasks(); }, 13000);
setTimeout(function(){ readTask(); }, 15000);



    
