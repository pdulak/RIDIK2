import { getTokenAndTaskData, sendAnswer } from './js/modules/tasks.mjs';
import { getModels, moderationAPI, openai_completion } from './js/modules/openai.mjs';


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

// getOpenAIModels()

const moderation = async () => {
    const data = await getTokenAndTaskData("moderation")

    const sentencesToModerate = data.input;

    const result = await moderationAPI(sentencesToModerate);
    const responseArray = result.results.map(element => element.flagged?1:0);
    console.log("Moderation result: " + JSON.stringify(responseArray));

    const isOK = await sendAnswer(responseArray)
    console.log(JSON.stringify(isOK));

}

// moderation()

const blogger = async () => {
    const data = await getTokenAndTaskData("blogger");
    console.log("Task data: " + JSON.stringify(data));

    const generalPrompt = "Jeste specjalistą od wypieku pizzy oraz jesteś doświadczonym pisarzem. " +
        "Piszesz wpis na blog dotyczący pizzy. Podany poniżej temat jest fragmentem tego wpisu, zatem to co " +
        "teraz napiszesz jest fragmentem większej całości. Całość składa się z następujących tematów: " +
        "\n\n" +
        data.blog.join("; ") +
        "\n\n" +
        "Napisz teraz tekst według polecenia, jak najbardziej trzymając się tego konkretnego polecenia: \n\n";

    const promises = data.blog.map(element => {
        return openai_completion(generalPrompt + element);
    });

    const results = await Promise.all(promises);
    const answer = results.map(element => element.choices[0].message.content);

    console.log("answer: " + JSON.stringify(answer));

    const isOK = await sendAnswer(answer)
    console.log(JSON.stringify(isOK));
}

blogger()