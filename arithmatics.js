const FIRST_OPERAND = 1
const SECOND_OPERAND = 2
const ENTER = 13
const TAB = 9
export class Generator {
  static operator = "a"
  static minFirstOperand = 0
  static maxFirstOperand = 10
  static minSecondOperand = 0
  static maxSecondOperand = 10
  static numQuestions = 5
  static questions = []
  static initialLoad = true

  static setDefaults(defaults) {
    if (defaults.minFirst) {
      Generator.minFirstOperand = parseInt(defaults.minFirst)
      $("#minFirstOperand").val(defaults.minFirst)
    }
    if (defaults.maxFirst) {
      this.maxFirstOperand = parseInt(defaults.maxFirst)
      $("#maxFirstOperand").val(defaults.maxFirst)
    }
    if (defaults.minSecond) {
      this.minSecondOperand = parseInt(defaults.minSecond)
      $("#minSecondOperand").val(defaults.minSecond)
    }
    if (defaults.maxFirst) {
      this.maxSecondOperand = parseInt(defaults.maxSecond)
      $("#maxSecondOperand").val(defaults.maxSecond)
    }
    if (defaults.operator) {
      this.operator = defaults.operator
      $("#operator").val(defaults.operator)
    }
    if (defaults.numQuestions) {
      this.numQuestions = parseInt(defaults.numQuestions)
      $("#numQuestions").val(defaults.numQuestions)
    }
  }

  static generateQuestions() {
    Generator.questions = []
    let questionBoxes = ""

    if (this.initialLoad) {
      const defaults = $.currentQueryString()
      this.setDefaults(defaults)
      this.initialLoad = false
    }

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

    // now that we have some question boxes populated with html, set some event triggers
    $("[id^=answerBox]").on("keydown", function (e) {
      if (e.keyCode === ENTER) {
        e.preventDefault()
        const index = parseInt(e.target.id.substring("answer_".length))
        Generator.checkAnswers(parseInt($(`#${e.target.id}`).val()), index)
      }
    })

    $("[id^=answerBox]").on("focusin click", function (e) {
      e.preventDefault()
      const index = parseInt(e.target.id.substring("answer_".length))
      Generator.highlightQuestion(index)
    })

    $("[id^=answerBox]").on("focusout", function (e) {
      e.preventDefault()
      $(`#${e.target.id}`).val($(`#${e.target.id}`).val().trim())
      const answer = $(`#${e.target.id}`).val()
      const index = parseInt(e.target.id.substring("answer_".length))
      Generator.removeQuestionHighlight(index)
      $(`#correctAnswer${index}`).hide()
      $(`#incorrectAnswer${index}`).hide()
      if (Generator.correctAnswer(parseInt(answer), index)) {
        $(`#correctAnswer${index}`).html("Correct!")
        $(`#correctAnswer${index}`).show()
      } else if (answer.length > 0) {
        $(`#incorrectAnswer${index}`).html("Try Again!")
        $(`#incorrectAnswer${index}`).show()
      }
    })

    // and stylesheets
    $(`[id^="answer_"]`).width(
      Math.max(
        Math.abs(this.minFirstOperand),
        Math.abs(this.maxFirstOperand),
        Math.abs(this.minSecondOperand),
        Math.abs(this.maxSecondOperand)
      ).toString().length * 30
    )

    window.scrollTo(0, 0)
    Generator.highlightQuestion(0)
  }

  static highlightQuestion(index) {
    $(`#questionBox${index}`).addClass("currentQuestionBox")
    $(`#answer_${index}`).select()

    if (index < Generator.questions.length) {
      $("html").animate(
        {
          scrollTop:
            window.scrollY +
            $(`#answer_${index}`)[0].getBoundingClientRect().y -
            window.innerHeight / 2,
        },
        "slow"
      )
    }
  }

  static removeQuestionHighlight(index) {
    $(`#questionBox${index}`).removeClass("currentQuestionBox")
  }

  static correctAnswer(answer, index) {
    return answer === this.questions[index].correctAnswer
  }

  static checkAnswers(answer, index) {
    if (this.correctAnswer(answer, index)) {
      $(`#incorrectAnswer${index}`).hide()
      $(`#correctAnswer${index}`).html("Correct!")
      $(`#correctAnswer${index}`).show()
      if (index >= Generator.questions.length - 1) {
        Generator.removeQuestionHighlight(index)
        setTimeout(() => {
          $("#answer_0").select()
        }, 1000)
      } else {
        $(`#answer_${index + 1}`).select()
        Generator.highlightQuestion(index + 1)
      }
    } else {
      $(`#correctAnswer${index}`).hide()
      $(`#incorrectAnswer${index}`).html("Try Again!")
      $(`#incorrectAnswer${index}`).show()
      $(`#answer_${index}`).select()
      Generator.highlightQuestion(index)
    }
  }

  constructor() {
    this.correctAnswer = null
  }

  generateQuestion(index) {
    let firstOperand = this.getRandomOperand(FIRST_OPERAND)
    let secondOperand = this.getRandomOperand(SECOND_OPERAND)
    let op = ""

    if (
      Generator.minFirstOperand >= 0 &&
      Generator.minSecondOperand >= 0 &&
      firstOperand < secondOperand
    ) {
      const tmp = firstOperand
      firstOperand = secondOperand
      secondOperand = tmp
    }

    switch (Generator.operator) {
      case "a": {
        this.correctAnswer = firstOperand + secondOperand
        op = "+"
        break
      }
      case "s": {
        this.correctAnswer = firstOperand - secondOperand
        op = "-"
        break
      }
      case "as": {
        if (this.getRandomOperator(2) == 0) {
          this.correctAnswer = firstOperand + secondOperand
          op = "+"
        } else {
          this.correctAnswer = firstOperand - secondOperand
          op = "-"
        }
        break
      }
      case "m": {
        this.correctAnswer = firstOperand * secondOperand
        op = "*"
        break
      }
      case "d": {
        this.correctAnswer = Math.round(firstOperand / secondOperand)
        op = "/"
        break
      }
      case "md": {
        if (this.getRandomOperator(2) == 0) {
          this.correctAnswer = firstOperand * secondOperand
          op = "*"
        } else {
          this.correctAnswer = Math.round(firstOperand / secondOperand)
          op = "/"
        }
        break
      }
    }
    $(`#questionBox${index}`).html(
      `
      <div>
        <div class="questionNumber">${index + 1}.</div>
        <div>
        <div class="equation stacked">
          <span class="operand">${firstOperand}</span>
          <span class="operator">${op}</span>
          <span class="operand">${secondOperand}</span>
          <span class="equals">=</span>
        </div>
      </div>
      <div id="answerBox${index}">
        <input type="number" size="${
          String(firstOperand).length
        }" id="answer_${index}" />
        <div id="feedback">
          <div id="correctAnswer${index}" style="color: green"></div>
          <div id="incorrectAnswer${index}" style="color: red"></div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    `
    )
    $(`#correctAnswer${index}`).hide()
    $(`#correctAnswer${index}`).hide()
    $(`#answer_${index}`).val("")
    $(`#answer_${index}`).focus()
  }

  getRandomOperator(numOptions) {
    return Math.floor(Math.random() * numOptions)
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
