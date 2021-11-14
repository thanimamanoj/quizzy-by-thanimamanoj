# frozen_string_literal: true

class MakeSlugNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :quizzes, :slug, false
  end
end
