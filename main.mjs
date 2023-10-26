import { getTokenAndTaskData, sendAnswer } from './js/modules/tasks.mjs';

const helloTask = async () => {
    const data = await getTokenAndTaskData("helloapi")
    const result = await sendAnswer(data.cookie)
    console.log(result)
}

helloTask()