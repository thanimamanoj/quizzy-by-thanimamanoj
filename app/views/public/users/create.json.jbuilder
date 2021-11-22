# frozen_string_literal: true

json.user do
  json.id @user.id
  json.quiz_id @quiz.id
  json.attempt_id @attempt.id
  json.email @user.email
  json.submit @attempt.submit
  json.correct_answers_count @attempt.correct_answers_count
  json.incorrect_answers_count @attempt.incorrect_answers_count
end
