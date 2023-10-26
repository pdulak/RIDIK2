let config = require('./config.json');
const tasks = require('./js/modules/tasks');

const helloTask = async () => {
    tasks.configure(config)
    const data = await tasks.getTokenAndTaskData("helloapi")
    const result = await tasks.sendAnswer(data.cookie)
}

helloTask()