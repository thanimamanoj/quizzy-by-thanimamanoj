# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.string :option_1, null: false
      t.string :option_2, null: false
      t.string :option_3
      t.string :option_4
      t.string :correct_answer, null: false
      t.references :quiz, null: false, foreign_key: true
      t.timestamps
    end
  end
end
