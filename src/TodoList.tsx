import React, {FC, useState} from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    // tasks: TaskType[] такой вариант тоже верный
    // функция removeTask  - функция которая ждет что ей дадут функцию которая принимает строку
    removeTask: (taskId: string) => void
    changeFilter:(value:FilterValuesType) => void
    addTask: (title: string) => void // функция которая не принимает ничего и не возвращает ничего
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


//в props передаем данные . которые в свою очередь управляются PropsType которые описаны выше
const TodoList: FC<TodoListPropsType> = ({title, tasks,removeTask,changeFilter,addTask}) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle} onChange={(event)=> {
                    // при попытке изменить input срабатывает событие onChange
                    // внутри onChange вызываем функцию и сетаем новое значение с помощью функции setNewTaskTitle
                    // и значение которое в момент onChange сидит в инпуте, мы можем получить с помощью
                    // объекта события event или e . в нем нас интересует event.currentTarget то есть это элемент с которым произошло событие
                    // обращаемся к event.currentTarget и берем его текущее значение event.currentTarget.value
                    //и мы это value отправляем в локальный state - setNewTaskTitle
                    setNewTaskTitle(event.currentTarget.value)}}/>
                {/*по нажатию добавляет новую task*/}
                <button onClick={ () => {
                    addTask(newTaskTitle)
                    //очищаем значение в state вызываем  setNewTaskTitle("") и добавляем пустую строку
                    setNewTaskTitle("")
                }}>+</button>
            </div>
            <ul>
                {
                    tasks.map( t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
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