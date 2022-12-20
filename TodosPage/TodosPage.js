/*
Create
Read (Index & Show)
Update
Destroy
*/
import { useState, useEffect } from 'react'


export default function TodoListItemsPage (props){
    const [todoListItems, setTodoListItems] = useState([])
    const [foundTodoListItem, setFoundTodoListItem] = useState(null)
    const [newTodoListItem, setNewTodoListItem] = useState({
        title: '',
        completed: false
    })
    // index
    const getTodoListItems = async () => {
        try {
            const response = await fetch('/api/todoListItems')
            const data = await response.json()
            setTodoListItems(data)
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteTodoListItem = async (id) => {
        try {
            const response = await fetch(`/api/todoListItems/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setFoundTodoListItem(data)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateTodoListItem = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/todoListItems/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...updatedData})
            })
            const data = await response.json()
            setFoundTodoListItem(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
        const createTodoListItem = async () => {
            try {
                const response = await fetch(`/api/todoListItems`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newTodoListItem})
                })
                const data = await response.json()
                setFoundTodoListItem(data)
                setNewTodoListItem({
                    title: '',
                    completed: false
                })
            } catch (error) {
                console.error(error)
            }
        }

    const handleChange = (evt) => {
        setNewTodoListItem({...newTodoListItem, [evt.target.name]: evt.target.value})
    }

    useEffect(()=> {
        getTodoListItems()
    }, [foundTodoListItem])

    return (
        <>
            {
                todoListItems && todoListItems.length ? (<ul>
                    {
                        todoListItems.map((todoListItem) => {
                            return (
                                <li>
                                    {todoListItem.title} {todoListItem.completed? 'and its completed' : 'its not completed'}
                                    <br/><button onClick={() => deleteTodoListItem(todoListItem._id)}>Delete This Todo</button>
                                </li>
                            )
                        })
                    }
                </ul>): <h1>No Todo's Yet Add One Below</h1>
            }
            {'Title '}<input value={newTodoListItem.name} onChange={handleChange} name="title"></input><br/>
            {'Completed '}<input type="checkbox" checked={newTodoListItem.readyToEat} onChange={(evt) => setNewTodoListItem({...newTodoListItem, completed: evt.target.checked })}></input><br/>
            <button onClick={() => createTodoListItem() }>Create A New Todo</button>
            {
                foundTodoListItem? <div>
                    <h1>{foundTodoListItem.title}</h1>
                    <h3>{foundTodoListItem.completed? 'Completed': 'Not Completed'}</h3>
                </div>: <>No Todo in Found Todo State</>
            }
        </>
    )
}