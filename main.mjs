import { configure as tasks_configure, getTokenAndTaskData, sendAnswer } from './js/modules/tasks.mjs';

let config;


const helloTask = async () => {
    config = await import('./config.json');
    const data = await getTokenAndTaskData("helloapi")
    const result = await sendAnswer(data.cookie)

}

helloTask()