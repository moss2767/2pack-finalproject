import { SET_USERS, SET_ALL_QUESTIONS_TO_PLAYERS, SEND_QUESTIONS_TO_SERVER } from '../actions/host'
import { SET_QUESTION } from '../actions/question'
import { SHOW_ANSWER_TO_PLAYER, GAME_STARTED, JOIN_GAME, CREATE_GAME } from '../actions/game'

const initialState = {
  users: [],
  room: null,
  question: {
    question: null,
    options: []
  },
  gameStarted: false,
  numberOfQuestions: null,
  currentQuestionIndex: null,
  answer: null,
  quiz: {
    id: null,
    name: null,
    questions: [
      {
        question: null,
        answers: [
          {
            correct: null,
            option: null
          }
        ]
      }
    ]
  }
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.users }

    case CREATE_GAME:
      return { ...state, room: action.room }

    case JOIN_GAME:
      return { ...state, room: action.room }

    case GAME_STARTED:
      return { ...state, gameStarted: true, numberOfQuestions: action.numberOfQuestions }

    case SHOW_ANSWER_TO_PLAYER:
      return { ...state, answer: action.answer }

    case SET_QUESTION:
      console.log(action)
      return { ...state, question: action.question, currentQuestionIndex: action.currentQuestionIndex, answer: null }

    case SEND_QUESTIONS_TO_SERVER:
      return { ...state, quiz: action.quiz }

    case SET_ALL_QUESTIONS_TO_PLAYERS:
      return { ...state, quiz: action.quiz }

    default:
      return state
  }
}
export default gameReducer
