# frozen_string_literal: true

class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  belongs_to :user

  validates :name, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  private

    def set_slug
      itr = 1
      loop do
        title_slug = name.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Quiz.exists?(slug: slug_candidate)

        itr += 1
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("quiz.slug.immutable"))
      end
    end
end
