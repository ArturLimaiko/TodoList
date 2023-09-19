import React, {FC} from 'react';



type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    // const title = props.title
    // const tasks = props.tasks
    const {title, tasks} = props

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={false}/> <span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                <li><input type="checkbox" checked={true}/> <span>React</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;