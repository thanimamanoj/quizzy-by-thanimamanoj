# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_18_133943) do

  create_table "attempt_answers", force: :cascade do |t|
    t.integer "question_id", null: false
    t.integer "attempt_id", null: false
    t.string "attempted_answer", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attempt_id"], name: "index_attempt_answers_on_attempt_id"
    t.index ["question_id"], name: "index_attempt_answers_on_question_id"
  end

  create_table "attempts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "quiz_id", null: false
    t.boolean "submit", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "correct_answers_count"
    t.integer "incorrect_answers_count"
    t.index ["quiz_id"], name: "index_attempts_on_quiz_id"
    t.index ["user_id"], name: "index_attempts_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title", null: false
    t.string "option_1", null: false
    t.string "option_2", null: false
    t.string "option_3"
    t.string "option_4"
    t.string "correct_answer", null: false
    t.integer "quiz_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.text "name", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.index ["slug"], name: "index_quizzes_on_slug", unique: true
    t.index ["user_id"], name: "index_quizzes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role", default: 0, null: false
    t.string "password_digest", null: false
    t.string "authentication_token"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "attempt_answers", "attempts"
  add_foreign_key "attempt_answers", "questions"
  add_foreign_key "attempts", "quizzes"
  add_foreign_key "attempts", "users"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "questions", "users", on_delete: :cascade
  add_foreign_key "quizzes", "users"
end
