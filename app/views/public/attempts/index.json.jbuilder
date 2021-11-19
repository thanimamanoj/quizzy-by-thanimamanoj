# frozen_string_literal: true

 json.attempt do

   json.reports @report do |r|
        json.id r.id
        json.quiz_name r.quiz.name
        json.first_name r.user.first_name
        json.last_name r.user.last_name
        json.email r.user.email
        json.correct_answers_count r.correct_answers_count
        json.incorrect_answers_count r.incorrect_answers_count

   end

 end
