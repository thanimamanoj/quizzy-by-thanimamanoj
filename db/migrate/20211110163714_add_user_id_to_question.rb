# frozen_string_literal: true

class AddUserIdToQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :user_id, :integer
    add_foreign_key :questions, :users, column: :user_id, on_delete: :cascade
  end
end
