const {Schema, model} = require('mongoose')

const todoListItemSchema = new Schema({
    title: String, 
    completed: Boolean
}, {
    timestamps:true
})

const TodoListItem = model('TodoListItem', todoListItemSchema)

module.exports = TodoListItem