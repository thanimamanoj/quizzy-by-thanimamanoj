# frozen_string_literal: true

class Public::UsersController < ApplicationController
  before_action :load_quiz

  def create
    @user = User.new(user_params)
    if @user.save
      render status: :ok, json: { notice: "User was successfully created!" }
    else
      render status: :unprocessable_entity,
        json: { error: @user.errors.full_messages.to_sentence }
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      puts @quiz
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end

    def quiz_slug
      params.require(:user).permit(:slug)
    end
end
