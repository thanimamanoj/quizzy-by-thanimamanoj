# frozen_string_literal: true

class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :attempts, dependent: :destroy
  belongs_to :user

  validates :name, presence: true

  def set_slug
    title_slug = name.parameterize
    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_quiz_slug = Quiz.where(
      regex_pattern,
      "#{title_slug}$|#{title_slug}-[0-9]+$"
    ).order(slug: :desc).first&.slug
    slug_count = 0
    if latest_quiz_slug.present?
      slug_count = latest_quiz_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
    self.slug = slug_candidate
  end
end
