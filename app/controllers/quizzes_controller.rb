# frozen_string_literal: true

class QuizzesController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit]
  before_action :load_quiz, only: %i[show update destroy]

  def index
    quizzes = policy_scope(Quiz)
    quizzes = quizzes.order("created_at DESC")
    # quizzes = quizzes.as_json(include: { user_id: { only: %i[id] } })
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    @quiz = current_user.quizzes.new(quiz_params)
    authorize @quiz
    if @quiz.save
      render status: :ok, json: { notice: t("successfully_created") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    authorize @quiz
    @questions = @quiz.questions.order("created_at DESC")#-check if its needed
    # render status: :ok, json: { quiz: @quiz }
  end

  def update
    authorize @quiz
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: "Successfully updated quiz." }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
    if params[:publish] === true
      set_slug
    end
  end

  def destroy
    authorize @quiz
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
