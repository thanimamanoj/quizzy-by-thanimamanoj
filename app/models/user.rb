# frozen_string_literal: true

class User < ApplicationRecord
  validates :first_name, presence: true, length: { maximum: Constants::MAX_TASK_FIRST_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_TASK_LAST_NAME_LENGTH }
  validates :email, presence: true, uniqueness: true, format: { with: Constants::VALID_EMAIL_REGEX }

  before_save :to_lowercase

  private

  def to_lowercase
    email.downcase!
  end
end
