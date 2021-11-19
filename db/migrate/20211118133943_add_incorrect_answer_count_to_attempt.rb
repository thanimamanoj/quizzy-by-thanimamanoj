# frozen_string_literal: true

class AddIncorrectAnswerCountToAttempt < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :incorrect_answers_count, :integer
  end
end
