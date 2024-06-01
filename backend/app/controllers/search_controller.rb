# frozen_string_literal: true

class SearchController < ApplicationController
  def search
    query = params[:name]
    results = SearchService.new(query, current_user).call
    render json: results
  end
end
