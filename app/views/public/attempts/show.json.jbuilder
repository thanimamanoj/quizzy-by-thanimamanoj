 # frozen_string_literal: true

json.attempt do
  json.attempt_id @attempt.id
  json.ans @ans do |a|
        json.question_id a.question_id
        json.answer a.attempted_answer
  end
end
