const FIRST_OPERAND = 1
const SECOND_OPERAND = 2

export class Generator {
  static operator = "+"
  static minFirstOperand = 0
  static maxFirstOperand = 10
  static minSecondOperand = 0
  static maxSecondOperand = 10
  static numQuestions = 5
  static questions = []

  static generateQuestions() {
    Generator.questions = []
    let questionBoxes = ""
    for (let index = 0; index < Generator.numQuestions; index++) {
      Generator.questions.push(new Generator())
      questionBoxes =
        questionBoxes +
        `<div id="questionBox${index}" class="questionBox"></div>\n`
    }

    $("#questions").html(questionBoxes)

    Generator.questions.forEach((question, index) => {
      question.generateQuestion(index)
    })

    $("[id^=answerBox]").on("keyup", function (e) {
      e.preventDefault()
      if (e.keyCode === 13) {
        const index = parseInt(e.target.id.substring(6))
        Generator.checkAnswers(parseInt($(`#${e.target.id}`).val()), index)
      }
    })

    window.scrollTo(0, 0)
    $("#answer0").select()
  }

  static checkAnswers(answer, index) {
    if (answer === this.questions[index].correctAnswer) {
      $(`#incorrectAnswer${index}`).hide()
      $(`#correctAnswer${index}`).html("Correct!")
      $(`#correctAnswer${index}`).show()
      $(`#answer${index + 1}`).select()
    } else {
      $(`#correctAnswer${index}`).hide()
      $(`#incorrectAnswer${index}`).html("Try Again!")
      $(`#incorrectAnswer${index}`).show()
      $(`#answer${index}`).select()
    }
  }

  constructor(answer = null) {
    this.correctAnswer = null
  }

  generateQuestion(index) {
    const firstOperand = this.getRandomOperand(FIRST_OPERAND)
    const secondOperand = this.getRandomOperand(SECOND_OPERAND)

    switch (Generator.operator) {
      case "+": {
        this.correctAnswer = firstOperand + secondOperand
        break
      }
      case "-": {
        this.correctAnswer = firstOperand - secondOperand
        break
      }
      case "x": {
        this.correctAnswer = firstOperand * secondOperand
        break
      }
      case "/": {
        this.correctAnswer = Math.round(firstOperand / secondOperand)
        break
      }
    }
    $(`#questionBox${index}`).html(
      `
      <span class="equation stacked">
        <span class="number">${firstOperand}</span>
        <span class="operator">${Generator.operator}</span>
        <span class="number">${secondOperand}</span>
        <span class="equals">=</span>
      </span>
      <div id="answerBox${index}">
        <input type="text" size="${
          String(firstOperand).length
        }" id="answer${index}" />
        <div id="correctAnswer${index}" style="color: green"></div>
        <div id="incorrectAnswer${index}" style="color: red"></div>
      </div>
      <br />
      <br />
    `
    )
    $(`#correctAnswer${index}`).hide()
    $(`#correctAnswer${index}`).hide()
    $(`#answer${index}`).val("")
    $(`#answer${index}`).focus()
  }

  getRandomOperand(operand) {
    if (operand === FIRST_OPERAND) {
      return Math.round(
        Math.random() *
          (Generator.maxFirstOperand - Generator.minFirstOperand) +
          Generator.minFirstOperand
      )
    } else {
      return Math.round(
        Math.random() *
          (Generator.maxSecondOperand - Generator.minSecondOperand) +
          Generator.minSecondOperand
      )
    }
  }
}

Generator.generateQuestions()
