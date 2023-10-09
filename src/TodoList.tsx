import React, {ChangeEvent, FC, KeyboardEvent, MouseEventHandler, useState} from 'react';
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
const TodoList: FC<TodoListPropsType> = ({title, tasks,removeTask,addTask,changeFilter}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")

//тут храним анонимные функции ,которые мы передаем на различные события
    //функция для обработчика onChange, в параметрах указали - event : ChangeEvent<HTMLInputElement>
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    //функция для обработчика onKeyPress, в параметрах указали - event: KeyboardEvent<HTMLInputElement>
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.charCode === 13) {//если нажали  клавишу enter то таска добавится
                addTask(newTaskTitle) //добавляется таска
                setNewTaskTitle("") //после как таска добавилась строка ввода очиститься
            }
    }

    //функция добавления новой задачи
    const addTaskHandler = () => {
        addTask(newTaskTitle)
        //очищаем значение в state вызываем  setNewTaskTitle("") и добавляем пустую строку
        setNewTaskTitle("")
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       //инпут сам вызовет функцию onNewTitleChangeHandler ,когда произойдет событие onChange
                       onChange={onNewTitleChangeHandler}

                       //когда произойдет нажатие клавиши вызови нашу функцию ,сюда придет объект event
                    onKeyPress={onKeyPressHandler}
                />
                {/*по нажатию добавляет новую task*/}
                <button onClick={addTaskHandler}>+</button>
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