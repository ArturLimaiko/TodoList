import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "completed" | "active";

//компонента App которая отрисовывает внутри себя Todolist
function App() {

    //Storage
    const todoListTitle_1: string = "What to learn?"
    // const todoListTitle_2: string = "What to buy?"

    //удаление задач
    let [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), isDone: true, title: "HTML&CSS"},
            {id: v1(), isDone: true, title: "JS"},
            {id: v1(), isDone: false, title: "React"},
            {id: v1(), isDone: false, title: "Redux"},
        ]
    );

    console.log(tasks)

    //фильтрация задач
    let [filter, setFilter] = useState<FilterValuesType>("all");

    //функция удаления задач
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        //вызываем функцию setTasks во время удаления задачи и засовываем в него отфильтрованую таску которую удалили
        setTasks(filteredTasks);
    }



    function addTask (title: string) {//функция добавления новой таски
        let newTask = {id: v1(),
            title: title,
            isDone: false
        };//сгенерируем новый объект такси у нее есть id title isDone
        let newTasks = [ newTask, ...tasks]; //если мы хотим получить новый массив в котором добавилась task, то мы должны создать новый массив newTasks и сказать добавь новую newTasks в начало массива, а затем добавь те таски которые сидели в старом массиве tasks , будет выглядеть так let newTasks = [ newTask, ...tasks];
        //первым элементом положили новый объект а последним элементом - достали все объекты из старого массива ...tasks];
        setTasks(newTasks); // - тут засовываем новый массив с добавленной  новой newTask
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter( t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter( t => t.isDone === false);
    }

    function changeFilter( value:FilterValuesType ) {
        setFilter(value);
    }

    //каждый Todolist получает на входе какие то данные - props. пропсы
    // а так же получаем колбеки
    //   removeTask={removeTask}
    //   changeFilter={changeFilter}
    return (
        <div className="App">
            <TodoList
                tasks={tasksForTodolist}
                title={todoListTitle_1}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}//addTask без скобок!иначе будет зацикливание - бесконечный цикл
            />
        </div>
    );
}

export default App;
