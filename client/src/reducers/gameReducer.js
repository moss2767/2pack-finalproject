import {
  CREATE_GAME,
  JOIN_GAME,
  SEND_ANSWER_TO_PLAYERS,
  SEND_QUESTIONS_TO_SERVER,
  SEND_START_GAME_TO_PLAYERS,
  SET_ALL_QUESTIONS_TO_PLAYERS,
  SEND_QUESTION_TO_PLAYERS,
  SET_USERS,
  TELL_SERVER_TO_SEND_ANSWER
} from '../actions/actions'

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

    case SEND_START_GAME_TO_PLAYERS:
      return { ...state, gameStarted: true, numberOfQuestions: action.numberOfQuestions }

    case SEND_ANSWER_TO_PLAYERS:
      return { ...state, answer: action.answer }

    case SEND_QUESTION_TO_PLAYERS:
      return { ...state, question: action.question, currentQuestionIndex: action.currentQuestionIndex, answer: null }

    case SEND_QUESTIONS_TO_SERVER:
      return { ...state, quiz: action.quiz }

    case SET_ALL_QUESTIONS_TO_PLAYERS:
      return { ...state, quiz: action.quiz }

    case TELL_SERVER_TO_SEND_ANSWER:
      return { ...state, answer: action.answer}
    default:
      return state
  }
}
export default gameReducer
