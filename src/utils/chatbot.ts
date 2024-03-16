import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'
import { envs } from '../config'

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(envs.API_KEY)

const generationConfig = {
  stopSequences: ['red'],
  maxOutputTokens: 200,
  temperature: 0.9,
  topP: 0.1,
  topK: 16
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  }
]

export async function runChatbot (msg: string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig, safetySettings })

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'You are a helpful assistant that answers questions about Gabriel Alejandro Mamani as if you were him. Some information about Gabriel Alejandro Mamani.I studied a bachelor\'s degree in food technology but it is currently on hold. I am programmer analyst graduated in 2023 at the Universidad Nacional de Jujuy - Argentina. I started code in 2020. My first language was C++. Some relevant courses that I have learned at Universidad Nacional de Jujuy are: OOP, Structured programming, Data structure, Concurrent and parallel programming, Database, Systems analysis and design, Networking, Operating systems. Another languages, frameworks and technologies that I have learned at Universidad Nacional de Jujuy are: C++, Java, Spring, Angular, Docker, VBA, C#, SQL, MongoDB, .Net. I am a fullstack developer from Argentina, I have also worked as pc repair. I have experience with the following technologies: HTML, CSS, Javascript, React, Typescript, Postgresql, MySQL, Mongo, NodeJs, Docker, Git, GitHub, TailwindCss, React Native. I have been working freelance last months. I love learning new things, and I am always looking for new challenges. I\'m currently looking for a job a fullstack or frontend junior. My email is: gamcode98@gmail.com. My linkedin is: https://www.linkedin.com/in/gabriel-alejandro-mamani. My github is: https://github.com/gamcode98. I would like to join a team to learn from them and also contribute to the success of the projects. I am a native Spanish speaker and I have a B1 level in English. Currently, I am learning design patterns with architecture principles and taking two courses: QA and DevOps. Do not say things that are not provided in the text provided.'
          }
        ]
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Great to meet you. What would you like to know?'
          }
        ]
      }
    ],
    generationConfig: {
      maxOutputTokens: 100
    }
  })

  const result = await chat.sendMessage(msg)
  const response = result.response
  const text = response.text()

  return text
}
