# frozen_string_literal: true

json.quiz do
  json.extract! @quiz,
    :id,
    :name,
    :created_at

  json.questions @questions do |question|
     json.extract! question,
       :id,
       :title,
       :option_1,
       :option_2,
       :option_3,
       :option_4,
       :correct_answer,
       :created_at
   end
end
