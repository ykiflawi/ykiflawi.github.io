const FIRST_OPERAND = 1
const SECOND_OPERAND = 2

class Generator {
  constructor(
    operator = "+",
    minFirstOperand = 0,
    maxFirstOperand = 10,
    minSecondOperand = 0,
    maxSecondOperand = 10,
    answer = null
  ) {
    this.operator = operator
    this.minFirstOperand = minFirstOperand
    this.maxFirstOperand = maxFirstOperand
    this.minSecondOperand = minSecondOperand
    this.maxSecondOperand = maxSecondOperand
    this.answer = answer
    this.correctAnswer = null
  }

  setOperator(operator) {
    this.operator = operator
  }

  setOperands(
    minFirstOperand,
    maxFirstOperand,
    minSecondOperand,
    maxSecondOperand
  ) {
    this.minFirstOperand = minFirstOperand
    this.maxFirstOperand = maxFirstOperand
    this.minSecondOperand = minSecondOperand
    this.maxSecondOperand = maxSecondOperand
  }

  generateQuestion() {
    $("#correctAnswer").hide()
    $("#correctAnswer").hide()
    const firstOperand = this.getRandomOperand(FIRST_OPERAND)
    const secondOperand = this.getRandomOperand(SECOND_OPERAND)

    switch (this.operator) {
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
    $("#question").html(
      `
      <span class="equation stacked">
        <span class="number">${firstOperand}</span>
        <span class="operator">${this.operator}</span>
        <span class="number">${secondOperand}</span>
        <span class="equals">=</span>
      </span>`
    )
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
        $("#operator").trigger("change")
      }, 600)
    } else {
      $("#correctAnswer").hide()
      $("#incorrectAnswer").html("Try Again!")
      $("#incorrectAnswer").show()
      $("#answer").select()
    }
  }
}

export let g = new Generator()

g.generateQuestion()
