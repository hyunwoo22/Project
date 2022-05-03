import { useState } from "react";

function Todo(){
    const [todo, setTodo] = useState('');
    const [todoArr, setTodoArr] = useState([]);

    const Add = (e) => {
        setTodo(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setTodo('');
        if(todo){
            setTodoArr((currentArr) => [todo, ...currentArr]);
        }
    }
    const onReset = (e) => {
        e.preventDefault();
        setTodoArr([]);
    }
    return(
        <div>
            <h1>ToDo List</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Write your To do" value={todo} onChange={Add}/>
                <button>Add To Do</button>
            </form>
            <ul>
                {
                    todoArr.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
            <form onSubmit={onReset}>
                <button>Reset</button>
            </form>
        </div>
    );
}
export default Todo;