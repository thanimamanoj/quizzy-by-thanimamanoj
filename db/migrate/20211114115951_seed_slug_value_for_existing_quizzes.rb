# frozen_string_literal: true

class SeedSlugValueForExistingQuizzes < ActiveRecord::Migration[6.1]
  def up
    Quiz.find_each do |quiz|
      quiz.send(:set_slug)
      quiz.save(validate: false)
    end
  end

  def down
    Quiz.find_each do |quiz|
      quiz.update(slug: nil)
      quiz.save(validate: false)
    end
  end
end
