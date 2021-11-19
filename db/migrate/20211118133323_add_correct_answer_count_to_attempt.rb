# frozen_string_literal: true

class AddCorrectAnswerCountToAttempt < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :correct_answers_count, :integer
  end
end
