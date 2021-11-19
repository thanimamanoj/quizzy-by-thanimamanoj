# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: [:index]

  def index
    @report = []
    @current_user.quizzes.each do |quiz|
      @report.push(*quiz.attempts.where(submit: true))
    end
  end

  def show
    @attempt = Attempt.find_by_id(params[:id])
  end
end
