# frozen_string_literal: true

class Public::UsersController < ApplicationController
  before_action :load_quiz

  def create
    @user = User.find_by(email: user_params[:email])
    if @user
      @attempt = Attempt.find_by(user_id: @user.id, quiz_id: @quiz.id)
      unless @attempt
        create_attempt
      end
    else
      @user = User.new(user_params)
      if @user.save
        render status: :ok, json: { notice: "User was successfully created!" }
        create_attempt
      else
        render status: :unprocessable_entity,
          json: { error: @user.errors.full_messages.to_sentence }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: load_quiz_slug[:slug])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end

    def load_quiz_slug
      params.require(:user).permit(:slug)
    end

    def create_attempt
      @attempt = @user.attempts.new(user_id: @user.id, quiz_id: @quiz.id, submit: false)
      @attempt.save!
    end
end
