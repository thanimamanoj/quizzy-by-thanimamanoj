# frozen_string_literal: true

json.attempt_answer do
  # json.id @attempt.id
  # json.quiz_id @quiz.id
  json.attempt_id @attempt.id
  json.attempts @attempts_value
  json.correct_count @correct
  json.incorrect_count @incorrect
  # json.email @user.email
  # json.submit @attempt.submit
end
