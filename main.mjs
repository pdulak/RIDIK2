import { getTokenAndTaskData, sendAnswer } from './js/modules/tasks.mjs';
import { getModels } from './js/modules/openai.mjs';

const helloTask = async () => {
    const data = await getTokenAndTaskData("helloapi")
    const result = await sendAnswer(data.cookie)
    console.log(result)
}

const getOpenAIModels = async () => {
    const result = await getModels();
    console.log(result)
}

//helloTask()

getOpenAIModels()