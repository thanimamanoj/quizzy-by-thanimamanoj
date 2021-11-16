# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  before_action :load_quiz

  def show
    @quiz
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end
end
