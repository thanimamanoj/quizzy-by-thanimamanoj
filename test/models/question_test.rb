# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @question = Question.new(
      title: "What is the nearest planet to Sun?",
      option_1: "Venus",
      option_2: "Mars",
      option_3: "Jupiter",
      correct_answer: "Mars",
      user_id: 1,
      quiz_id: 144)
  end

  def test_question_should_not_be_valid_and_saved_without_title
    @question.title = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Title can't be blank"
  end

  def test_question_should_not_be_valid_and_saved_without_option_1
    @question.option_1 = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Option 1 can't be blank"
  end

  def test_question_should_not_be_valid_and_saved_without_option_2
    @question.option_2 = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Option 2 can't be blank"
  end

  def test_question_should_not_be_valid_and_saved_without_correct_answer
    @question.correct_answer = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Correct answer can't be blank"
  end
end
