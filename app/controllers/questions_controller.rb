# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_quiz, only: :create
  before_action :authenticate_user_using_x_auth_token
  before_action :load_question, only: [:show, :update, :destroy]

  def show
    render status: :ok, json: { question: @question }
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: "Successfully updated question." }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def create
    question = @quiz.questions.new(question_params.merge(user_id: @current_user.id))
    if question.save
      render status: :ok, json: { notice: "Question was successfully created" }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: "Successfully deleted Question." }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(id: question_params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: t("question.not_found") }
      end
    end

    def question_params
      params.require(:question).permit(:title, :option_1, :option_2, :option_3, :option_4, :correct_answer, :quiz_id)
    end
end
