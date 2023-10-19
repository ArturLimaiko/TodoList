import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    // tasks: TaskType[] такой вариант тоже верный
    // функция removeTask  - функция которая ждет что ей дадут функцию которая принимает строку
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void // функция которая не принимает ничего и не возвращает ничего
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


//в props передаем данные . которые в свою очередь управляются PropsType которые описаны выше
const TodoList: FC<TodoListPropsType> = ({title, tasks, removeTask, addTask, changeFilter}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")


//ТУТ ХРАНИМ анонимные функции ,которые мы передаем на различные события
    //функция для обработчика onChange, в параметрах указали - event : ChangeEvent<HTMLInputElement>
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    // функция для обработчика onKeyPress, по скольку функцию вынесли из инпута то надо ее протипизировать что бы реакт понял что мы хотим
    // по этому в параметрах указали - event: KeyboardEvent<HTMLInputElement>
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {//если нажали  клавишу ENTER то таска добавится
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

    //ФУНКЦИИ С ФИЛЬТРАМИ
    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    // Выносим функцию map в отдельную переменную
    {/*проходимся map вызывает стрелочную функцию внутри мы создаем новую функцию колбек
     которой передаем каждую кнопку х по этому у каждой кнопки x свой колбек */
    }
    const mapped = tasks.map(t => {
        //объявляем функцию onRemoveHandler . каждый раз onRemoveHandler обращается к своей таске
        //через свой id и этот onRemoveHandler отдаем каждый раз новой созданной кнопке
        const onRemoveHandler = () => {
            removeTask(t.id)
        }
        return (<li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            {/*ссылка на Функцию удаления не общая. мы не можем вынести ее наверх.она своя у каждой <li> */}
            {/*<button onClick={onRemoveHandler}>x</button>*/}
            <Button name={"x"} callBack={onRemoveHandler}/>
        </li>)
    })

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                    //инпут сам вызовет ссылку на функцию onNewTitleChangeHandler ,когда произойдет событие onChange
                       onChange={onNewTitleChangeHandler}

                    //по скольку печатаем в инпуте соответственно и наблюдателя функцию onKeyPress вешаем сюда же
                    //когда произойдет нажатие клавиши вызови нашу функцию onKeyPressHandler,сюда придет объект event
                       onKeyPress={onKeyPressHandler}
                />
                {/*по нажатию добавляет новую task( в параметрах ссылка на функцию addTaskHandler)*/}
                {/*<button onClick={addTaskHandler}>+</button>*/}
                {/*выше оставил старый вариант*/}
                <Button name={"+"} callBack={addTaskHandler}/>
            </div>
            <ul>
                {mapped}
            </ul>
            <div>
                {/*//передаем !!!ссылку на функцию!!! в кнопки. при клике говорим что вызывай функцию обработчик.onAllClickHandler onActiveClickHandler onCompletedClickHandler*/}
                {/*<button onClick={onAllClickHandler}>All</button>*/}
                {/*<button onClick={onActiveClickHandler}>Active</button>*/}
                {/*<button onClick={onCompletedClickHandler}>Completed</button>*/}
                {/*выше оставил старый вариант*/}
                <Button name={'All'} callBack={onAllClickHandler}/>
                <Button name={'Active'} callBack={onActiveClickHandler}/>
                <Button name={'Completed'} callBack={onCompletedClickHandler}/>
            </div>
        </div>
    )
}

export default TodoList;