# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit]

  def create
    quiz = Quiz.new(quiz_params.merge(user: current_user))
    if quiz.save
      render status: :ok, json: { notice: t("successfully_created") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :user_id)
    end
end
