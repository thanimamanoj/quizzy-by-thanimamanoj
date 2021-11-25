# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  before_action :load_quiz, only: %i[show verify]

  def verify
    render status: :ok, json: { quiz: @quiz }
  end

  def show
    @questions = @quiz.questions.all
    render status: :ok, json: { quiz: @quiz, question: @questions }
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end
end
