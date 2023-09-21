import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


function App() {

    //Storage

    const todoListTitle_1: string = "What to learn?"
    // const todoListTitle_2: string = "What to buy?"


    let initTasks: Array<TaskType> = [
        {id: 1, isDone: true, title: "HTML&CSS"},
        {id: 2, isDone: true, title: "JS"},
        {id: 3, isDone: false, title: "React"},
        {id: 4, isDone: false, title: "Redux"},
    ]

    let [tasks,setTasks ]  = useState(initTasks);


        // const tasks_2:Array<TaskType> = [
        //     {id: 5, isDone: false, title: "Marmelade"},
        //     {id: 6, isDone: true, title: "Nutella"},
        //     {id: 7, isDone: false, title: "Nuts"},
        //     {id: 8, isDone: true, title: "Snickers"},
        // ]


        function removeTask(id: number) {
            let filteredTasks = tasks.filter(t => t.id !== id)
            setTasks(filteredTasks);
        }

    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title={todoListTitle_1}
                removeTask={removeTask}
            />
            {/*<TodoList*/}
            {/*    tasks={tasks_2}*/}
            {/*    title={todoListTitle_2}/>*/}
        </div>
    );
}

export default App;
