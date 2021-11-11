# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_quiz, only: :create
  before_action :authenticate_user_using_x_auth_token

  def create
    question = @quiz.questions.new(question_params.merge(user_id: @current_user.id))
    if question.save
      render status: :ok, json: { notice: "Question was successfully created" }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(id: question_params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end

    def question_params
      params.require(:question).permit(:title, :option_1, :option_2, :option_3, :option_4, :correct_answer, :quiz_id)
    end
end
