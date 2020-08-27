import { Generator } from "./arithmatics.js"
import { debounce } from "./debounce.js"

$("#operator").on("change", function (e) {
  e.preventDefault()
  Generator.operator = $("#operator").val()
  Generator.generateQuestions()
})

$("#generateQuestions").on("click", function (e) {
  e.preventDefault()
  Generator.generateQuestions()
})

$("#minFirstOperand").on(
  "keyup",
  debounce(function (e) {
    e.preventDefault()
    Generator.minFirstOperand = parseInt($("#minFirstOperand").val())
  }, 500)
)
$("#maxFirstOperand").on(
  "keyup",
  debounce(function (e) {
    e.preventDefault()
    Generator.maxFirstOperand = parseInt($("#maxFirstOperand").val())
  }, 500)
)
$("#minSecondOperand").on(
  "keyup",
  debounce(function (e) {
    e.preventDefault()
    Generator.minSecondOperand = parseInt($("#minSecondOperand").val())
  }, 500)
)
$("#maxSecondOperand").on(
  "keyup",
  debounce(function (e) {
    e.preventDefault()
    Generator.maxSecondOperand = parseInt($("#maxSecondOperand").val())
  }, 500)
)
$("#numQuestions").on(
  "keyup",
  debounce(function (e) {
    e.preventDefault()
    Generator.numQuestions = parseInt($("#numQuestions").val())
  }, 500)
)
