# frozen_string_literal: true

class Attempt < ApplicationRecord
  has_many :attempt_answers
  belongs_to :quiz
  belongs_to :user
end
