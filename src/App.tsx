import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


function App() {

    //Storage

    const todoListTitle_1: string = "What to learn?"
    const todoListTitle_2: string = "What to buy?"
    const tasks_1: Array<TaskType> = [
        {id: 1, isDone: false, title: "HTML&CSS"},
        {id: 2, isDone: true, title: "JS"},
        {id: 3, isDone: true, title: "React"},
        {id: 4, isDone: true, title: "Redux"},
    ]

    const tasks_2:Array<TaskType> = [
        {id: 5, isDone: false, title: "Marmelade"},
        {id: 6, isDone: true, title: "Nutella"},
        {id: 7, isDone: false, title: "Nuts"},
        {id: 8, isDone: true, title: "Snickers"},
    ]


    return (
        <div className="App">
            <TodoList
                tasks={tasks_1}
                title={todoListTitle_1}/>
            <TodoList
                tasks={tasks_2}
                title={todoListTitle_2}/>
        </div>
    );
}

export default App;
