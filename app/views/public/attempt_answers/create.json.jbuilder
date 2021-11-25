# frozen_string_literal: true

json.attempt_answer do
  json.attempt_id @attempt.id
  json.attempts @attempts_value
  json.correct_count @correct
  json.incorrect_count @incorrect
  json.unanswered @unanswered

end
