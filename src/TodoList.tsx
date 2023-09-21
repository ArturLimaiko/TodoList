import React, {FC} from 'react';


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    // tasks: TaskType[] такой вариант тоже верный
    removeTask: Function
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({title, tasks,removeTask}) => {

    // const title = props.title
    // const tasks = props.tasks
    // const {title, tasks} = props

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map( t => <li><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => { removeTask(t.id)}  }>x</button>
                    </li>)
                }
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