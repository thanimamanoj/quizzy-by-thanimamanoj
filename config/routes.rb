# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, except: %i[new edit], param: :id
    resources :questions, except: %i[new edit], param: :id
  end
  namespace :public do
    resources :quizzes, only: %i[show ], param: :slug
    resources :users, only: :create, param: :slug
    resources :attempts, only: %i[show index]
    resources :attempt_answers, only: :create

  end

  get "/public/quizzes/verify/:slug" => "public/quizzes#verify"
  get "/export" => "reports#export"
  get "/export_status" => "reports#export_status"
  get "/export_download" => "reports#export_download"
  root "home#index"
  get "*path", to: "home#index", via: :all
end
