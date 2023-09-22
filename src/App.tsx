import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


export type FilterValuesType = "all" | "completed" | "active";

function App() {

    //Storage
    const todoListTitle_1: string = "What to learn?"
    // const todoListTitle_2: string = "What to buy?"

    //удаление задач
    let [tasks, setTasks] = useState<Array<TaskType>>([
            {id: 1, isDone: true, title: "HTML&CSS"},
            {id: 2, isDone: true, title: "JS"},
            {id: 3, isDone: false, title: "React"},
            {id: 4, isDone: false, title: "Redux"},
        ]
    );

    //фильтрация задач
    let [filter, setFilter] = useState<FilterValuesType>("all");

    //функция удаления задач
    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
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

    return (
        <div className="App">
            <TodoList
                tasks={tasksForTodolist}
                title={todoListTitle_1}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
