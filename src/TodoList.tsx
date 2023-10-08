import React, {FC} from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    // tasks: TaskType[] такой вариант тоже верный
    removeTask: (id: number) => void
    changeFilter:(value:FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


//в props передаем данные . которые в свою очередь управляются PropsType которые описаны выше
const TodoList: FC<TodoListPropsType> = ({title, tasks,removeTask,changeFilter}) => {

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
                <button onClick={ () => { changeFilter("all")}} >All</button>
                <button onClick={ () => { changeFilter("active")}} >Active</button>
                <button onClick={ () => { changeFilter("completed")}} >Completed</button>
            </div>
        </div>
    )
}

export default TodoList;