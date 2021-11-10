# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  belongs_to :user

  validates :title, presence: true
  validates :option_1, presence: true
  validates :option_2, presence: true
  validates :correct_answer, presence: true
end
