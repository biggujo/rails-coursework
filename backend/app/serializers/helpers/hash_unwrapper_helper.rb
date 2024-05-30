# frozen_string_literal: true

module HashUnwrapperHelper
  def to_h
    data = serializable_hash

    if data[:data].is_a? Hash
      data[:data][:attributes]

    elsif data[:data].is_a? Array
      data[:data].pluck(:attributes)

    elsif data[:data].nil?
      nil

    else
      data
    end
  end
end
