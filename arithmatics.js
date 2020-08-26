const FIRST_OPERAND = 1
const SECOND_OPERAND = 3

class Generator {
  constructor(
    operation = "add",
    minFirstOperand = 0,
    maxFirstOperand = 10,
    minSecondOperand = 0,
    maxSecondOperand = 10,
    answer = null
  ) {
    this.operation = operation
    this.minFirstOperand = minFirstOperand
    this.maxFirstOperand = maxFirstOperand
    this.minSecondOperand = minSecondOperand
    this.maxSecondOperand = maxSecondOperand
    this.answer = answer
    this.correctAnswer = null
  }

  generateQuestion() {
    $("#correctAnswer").hide()
    $("#correctAnswer").hide()
    const firstOperand = this.getRandomOperand(FIRST_OPERAND)
    const secondOperand = this.getRandomOperand(SECOND_OPERAND)

    switch (this.operation) {
      case "add": {
        $("#question").html(firstOperand + " + " + secondOperand)
        this.correctAnswer = firstOperand + secondOperand
        break
      }
      case "subtract": {
        $("#question").html(firstOperand + " - " + secondOperand)
        this.correctAnswer = firstOperand - secondOperand
        break
      }
      case "multiply": {
        $("#question").html(firstOperand + " x " + secondOperand)
        this.correctAnswer = firstOperand * secondOperand
        break
      }
      case "divide": {
        $("#question").html(firstOperand + " / " + secondOperand)
        this.correctAnswer = Math.round(firstOperand / secondOperand)
        break
      }
    }
    $("#answer").val("")
    $("#answer").focus()
  }

  getRandomOperand(operand) {
    if (operand === FIRST_OPERAND) {
      return Math.round(
        Math.random() * (this.maxFirstOperand - this.minFirstOperand) +
          this.minFirstOperand
      )
    } else {
      return Math.round(
        Math.random() * (this.maxSecondOperand - this.minSecondOperand) +
          this.minSecondOperand
      )
    }
  }

  checkAnswer(answer) {
    if (answer === this.correctAnswer) {
      $("#incorrectAnswer").hide()
      $("#correctAnswer").html("Correct!")
      $("#correctAnswer").show()
      setTimeout(function () {
        $("#generateQuestion").trigger("click")
      }, 600)
    } else {
      $("#correctAnswer").hide()
      $("#incorrectAnswer").html("Try Again!")
      $("#incorrectAnswer").show()
      $("#answer").select()
    }
  }
}

export let g = null

export function generateQuestion(o, a, b, c, d) {
  g = new Generator(o, a, b, c, d)
  g.generateQuestion()
}

export function checkAnswer(r) {
  g.checkAnswer(r)
}
