# frozen_string_literal: true

require 'csv'

class PostsCsvExportService
  def initialize(records)
    @records = records
    @klass = records.klass
  end

  def to_csv
    attributes = collect_attributes

    CSV.generate(headers: true) do |csv|
      csv << attributes

      @records.each do |record|
        csv << attributes.map { |attr| fetch_attribute(record, attr) }
      end
    end
  end

  private

  def collect_attributes
    base_attributes = @klass.attribute_names
    user_attributes = %w[user.id user.email user.nickname user.created_at user.updated_at]
    group_attributes = %w[group.id group.name group.description]
    repost_attributes = %w[repost.id repost.content repost.created_at repost.updated_at]
    custom_attributes = %w[likes_count dislikes_count]

    base_attributes + user_attributes + group_attributes + repost_attributes + custom_attributes
  end

  def fetch_attribute(record, attr)
    parts = attr.split('.')
    parts.inject(record) do |obj, method|
      obj.respond_to?(method) ? obj.send(method) : nil
    end
  end
end

