import { generateQuestion, checkAnswer } from "./arithmatics.js"

$("#generateQuestion").on("click", function (e) {
  e.preventDefault()
  generateQuestion(
    $("#operation").val(),
    parseInt($("#minFirstOperand").val()),
    parseInt($("#maxFirstOperand").val()),
    parseInt($("#minSecondOperand").val()),
    parseInt($("#maxSecondOperand").val())
  )
})
$("#checkAnswer").on("click", function (e) {
  e.preventDefault()
  checkAnswer(parseInt($("#answer").val()))
})
$("#generateQuestion").click()
