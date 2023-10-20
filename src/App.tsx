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
    //v1() генерация айдишек
    // тут же храним значение чекбокса IsDone
    let [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), isDone: true, title: "HTML&CSS"},
            {id: v1(), isDone: true, title: "JS"},
            {id: v1(), isDone: false, title: "React"},
            {id: v1(), isDone: false, title: "Redux"},
        ]
    );
    console.log(tasks)

        //функция хранения значения чекбокса
        // 2м параметром функции подсказываем на какое значение поменять - isDone : boolean
    // далее нам нужно функцию changeStatus прокинуть вниз через пропсы
    function changeStatus(taskId : string, isDone : boolean) {
        // с помощью замыкания обратимся к переменной tasks которая лежит за пределами это функции
        // task - с помощью find() находим по айди таску . find принимает колбек функцию
        // которая вызывает колбек функцию для каждого элемента tasks
        // каждая tasks приходит как параметр (t) в колбек функцию
        // дальше наша стрелочная функция должна вернуть true - если возвращает true то тогда наша таска (t)
        // для который была вызвана функция которая вернет нам true - эта task и будет считаться найденой
        // и запишется в переменную let task
        let task = tasks.find( t => t.id === taskId);
            // если таска айди по которой пробегаемся = той по которую надо поменять
            // taskId - тот кто эту функцию вызовен он и должен обеспечить ее айдишкой той таски которую надо изменить


            // более длинный  вариант который ниже - закоментил ( для меня он более понятен на данный момент)
            // if(t.id === taskId ) {
            //      true;
            // }
            // else  {
            //     return false;
            // }

        // теперь у нас есть та таска task.isDone которую нужно менять => меняем на значение из параметра isDone
        // проверим - если таска действительно существует тогда isDone значение поменять на противоположное
        // псевдоистина и псевдоложь
        if (task) {
            task.isDone = isDone;
        }
        // что бы произошла перерисовка мы должны  вызвать setTasks , по скольку все таски сидят в массиве
        // надо реакту сказать что у нас изменилось значение в массиве - а именно одна таска task
        // и говорим - "...возьми массив тасок обратно там изменилась таска"
        //далее нам надо вызвать функцию в тудулист компоненте когда будет произведено событие onChange в input

        // сюда в функцию setTasks передаем массив tasks который деструктурируем
        // если дословно - массив заполнись теми элементами которые сидели в старом массиве
        // мы говорим tasks - ты массив - раскукожься на части и засунься внутрь нового массива
        setTasks([...tasks]);
    }

    //фильтрация задач
    let [filter, setFilter] = useState<FilterValuesType>("all");

    //функция удаления задач
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        //вызываем функцию setTasks во время удаления задачи и засовываем в него отфильтрованую таску которую удалили
        setTasks(filteredTasks);
    }

    function addTask (title: string) {//функция добавления новой таски
        //добавим к новой переменной объект c таской
        let newTask = {id: v1(), title: title, isDone: false};//сгенерируем новый объект такси у нее есть id title isDone
        let newTasks = [ newTask, ...tasks];
        // с помощью метода деструктуризации мы берем
        // если мы хотим получить новый массив в котором добавилась task, то мы должны создать новый массив newTasks и сказать добавь новую newTasks в начало массива, а затем добавь те таски которые сидели в старом массиве tasks , будет выглядеть так let newTasks = [ newTask, ...tasks];
        // первым элементом положили новый объект а последним элементом - достали все объекты из старого массива ...tasks];
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
                changeTaskStatus={changeStatus}
            />
        </div>
    );
}

export default App;
