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
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
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
        answerButtonsElement.removeChild (answerButtonsElement.firstChild)
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
        question:'In which Italian city can you find the Colosseum?',
        answers: [
            {text: 'Rome', correct:true },
            {text: 'Venice', correct:false },
            {text: 'Naples', correct:false },
            {text: 'Milan', correct:false }
        ]
    },
    {
        question:'What is the speed of sound?',
        answers: [
            {text: '120 km/h', correct:false },
            {text: '400 km/h', correct:false },
            {text: '1,200 km/h', correct:true },
            {text: 'Fast', correct:false }
        ]
    },
    {
        question:'What do we call a newly hatched butterfly?',
        answers: [
            {text: 'A moth', correct:false },
            {text: 'A butter', correct:false },
            {text: 'A chrysalis', correct:false },
            {text: 'A butterfly', correct:true }
        ]
    },
    {
        question:'What is the main component of the sun?',
        answers: [
            {text: 'Gas', correct:true },
            {text: 'Liquid lava', correct:false },
            {text: 'Molten iron', correct:false },
            {text: 'Rock', correct:false }
        ]
    },
    {
        question:'Which of the following animals can run the fastest?',
        answers: [
            {text: 'Leopard', correct:false },
            {text: 'Tiger', correct:false },
            {text: 'Lion', correct:false },
            {text: 'Cheetah', correct:true }
        ]
    },
    {
        question:'What is the most points that a player can score with a single throw in darts?',
        answers: [
            {text: '20', correct:false },
            {text: '40', correct:false },
            {text: '80', correct:false },
            {text: '60', correct:true }
        ]
    },
]