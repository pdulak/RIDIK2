import {getTokenAndTaskData, sendAnswer} from '../js/modules/tasks.mjs';
import {getModels} from '../js/modules/openai.mjs';

const moderation = async () => {
    const data = await getTokenAndTaskData("moderation")
    //const result = await sendAnswer(data.cookie)
    //console.log(result)
}

moderation()