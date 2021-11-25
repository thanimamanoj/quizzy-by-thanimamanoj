# frozen_string_literal: true

class Public::AttemptAnswersController < ApplicationController
  before_action :load_attempt
  def create
    @correct = 0
    @incorrect = 0
    if @attempt.submit
      render status: :unprocessable_entity, json: { error: "Quiz has already been submitted" }
    else
      @attempts_value = params[:attempt_answer][:answer]
      @unanswered = params[:attempt_answer][:unanswered]
      @incorrect += @unanswered
      @attempts_value.each do |attempt_details|
        question_id = attempt_details[0]
        attempted_answer = attempt_details[1]
        attempt_answer = @attempt.attempt_answers.new(
          {
            question_id: question_id,
            attempted_answer: attempted_answer
          })
        attempt_answer.save!
        question = Question.find_by(id: question_id)
        if question.correct_answer === attempted_answer
          @correct += 1
        else
          @incorrect += 1
        end
        @attempt.update(submit: true, correct_answers_count: @correct, incorrect_answers_count: @incorrect)
      end
    end
  end

  private

    def load_attempt
      @attempt = Attempt.find_by_id(attempt_answer_params[:attempt_id])
      unless @attempt
        render status: :not_found, json: { error: "Attempt not found" }
      end
    end

    def attempt_answer_params
      params.require(:attempt_answer).permit(
        :attempt_id,
        :answer)
    end
end
