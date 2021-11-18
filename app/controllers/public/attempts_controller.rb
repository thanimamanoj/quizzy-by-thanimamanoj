# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  # before_action :authenticate_user_using_x_auth_token, only: [:index]
  def show
    @attempt = Attempt.find_by_id(params[:id])
  end
end
