const tasksConfig = {
    apiKey : "",
    token : "",
    url : "",
}

export const configure = (config) => {
    tasksConfig.apiKey = config.zadaniaApiKey;
    tasksConfig.url = config.zadaniaUrl;
}

export const getToken = async (taskName) => {
    try {
        const response = await fetch(`${tasksConfig.url}token/${taskName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                apikey: tasksConfig.apiKey
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log("tasksGetToken data: ", data)
        tasksConfig.token = data.token;
        return data.token;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export const getTaskData = async (token = tasksConfig.token) => {
    try {
        const response = await fetch(`${tasksConfig.url}task/${token}`)
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log("tasksGetTaskData data: ", data)
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export const getTokenAndTaskData = async (taskName) => {
    await getToken(taskName)
    return await getTaskData()
}

export const sendAnswer = async (answer, token = tasksConfig.token) => {
    try {
        const response = await fetch(`${tasksConfig.url}answer/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                answer: answer
            })
        })

        const data = await response.json();
        console.log("tasksSendAnswer data: ", data)
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
