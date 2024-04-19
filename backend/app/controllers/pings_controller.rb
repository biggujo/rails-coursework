# frozen_string_literal: true

class PingsController < ApplicationController
  def index
    render json: {
      message: "ping",
      data: JSON.parse(request.body.read)
    }
  end
end
