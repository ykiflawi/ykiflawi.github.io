import { g } from "./arithmatics.js"
import { debounce } from "./debounce.js"

$("#operator").on("change", function (e) {
  e.preventDefault()
  g.setOperator($("#operator").val())
  g.generateQuestion()
})

$("#newQuestion").on("click", function (e) {
  e.preventDefault()
  g.generateQuestion()
})

$("#minFirstOperand,#maxFirstOperand,#minSecondOperand,#maxSecondOperand").on(
  "keyup",
  debounce(function (e) {
    e.preventDefault()
    g.setOperands(
      parseInt($("#minFirstOperand").val()),
      parseInt($("#maxFirstOperand").val()),
      parseInt($("#minSecondOperand").val()),
      parseInt($("#maxSecondOperand").val())
    )
  }, 500)
)

$("#answer").on("keyup", function (e) {
  e.preventDefault()
  if (e.keyCode === 13) {
    g.checkAnswer(parseInt($("#answer").val()))
  }
})

$("#checkAnswer").on("click", function (e) {
  e.preventDefault()
  g.checkAnswer(parseInt($("#answer").val()))
})
