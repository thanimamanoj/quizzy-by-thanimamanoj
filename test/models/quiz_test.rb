# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = Quiz.new(
      name: "Science quiz",
      user_id: 1)
  end

  def test_quiz_should_not_be_valid_without_user
    @quiz.user_id = nil
    assert_not @quiz.save
    assert_includes @quiz.errors.full_messages, "User must exist"
  end

  def test_quiz_should_not_be_valid_and_saved_without_name
    @quiz.name = ""
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Name can't be blank"
  end

  # embed new test cases here...
end
