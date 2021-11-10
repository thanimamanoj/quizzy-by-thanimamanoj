# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit]
  before_action :load_quiz, only: %i[show update destroy]

  def index
    quizzes = current_user.quizzes.all.order("created_at DESC")
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    @quiz = current_user.quizzes.new(quiz_params)
    if @quiz.save
      render status: :ok, json: { notice: t("successfully_created") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    render status: :ok, json: { quiz: @quiz }
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: "Successfully updated quiz." }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: "Successfully deleted quiz." }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def load_quiz
      @quiz = current_user.quizzes.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
