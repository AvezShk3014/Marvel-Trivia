const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who Killed Loki?',
    answers: [
      { text: 'Slyvie', correct: false },
      { text: 'Sutur', correct: false },
      { text: 'Thanos', correct: true },
      { text: 'Hela', correct: false }
    ]
  },
  {
    question: " Which Nick Fury's eye was scarred by Goose the cat? ",
    answers: [
      { text: 'Right', correct: false },
      { text: 'Left', correct: true }

    ]
  },
  {
    question: 'Which actor played crossbones in the MCU?',
    answers: [
      { text: 'John Wayne', correct: false },
      { text: 'Frank Anthony Grillo', correct: true },
      { text: 'Sean Connery', correct: false },
      { text: 'Steve McQueen', correct: false }
    ]
  },
  {
    question: 'Who is the villan of the upcomping Guardians of the Galaxy movie?  ',
    answers: [
      { text: 'The Collector', correct:false  },
      { text: 'Karanada ', correct: false },
      { text: 'Ego the living planet', correct: false },
      { text: 'High Evolutionary', correct: true }
      
    ]
  }
]