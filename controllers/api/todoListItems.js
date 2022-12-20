const TodoListItem = require('../../models/TodoListItem')

const dataController = {
  // Index,
  index (req, res, next) {
    TodoListItem.find({}, (err, found) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todoListItem = found
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    TodoListItem.findByIdAndDelete(req.params.id, (err, deleted) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todoListItem = deleted
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    req.body.completed = req.body.completed === 'on'
    TodoListItem.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updated) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todoListItem = updated
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
    req.body.completed = req.body.completed === 'on'
   
    TodoListItem.create(req.body, (err, created) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todoListItem = created
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    TodoListItem.findById(req.params.id, (err, found) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a TodoListItem with that ID'
        })
      } else {
        res.locals.data.todoListItem = found
        next()
      }
    })
  }
}

const apiController = {
    index (req, res, next) {
      res.json(res.locals.data.todoListItems)
    },
    show (req, res, next) {
      res.json(res.locals.data.todoListItem)
    }
  }

module.exports = { dataController, apiController }