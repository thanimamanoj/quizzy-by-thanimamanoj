# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform(current_user_id)
    # Do something
    puts "exporting is being performed"
    @reports = []
    @current_user = User.find_by(id: current_user_id)
    @current_user.quizzes.each do |quiz|
      @reports.push(*quiz.attempts.where(submit: true))
    end

    total @reports.size
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook

    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
      worksheet.add_row %w(Quiz\ Name User\ Name Email Correct\ Answers Incorrect\ Answers)

      @reports.each.with_index(1) do |report, idx|
        worksheet.add_row [report.quiz.name, "#{report.user.first_name} #{report.user.last_name}", report.user.email,
report.correct_answers_count, report.incorrect_answers_count]
        at idx
        sleep 0.5
      end
    end
    xlsx_package.serialize Rails.root.join("tmp", "reports_export_#{self.jid}.xlsx")
  end
end
