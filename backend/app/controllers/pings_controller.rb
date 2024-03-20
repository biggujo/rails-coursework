class PingsController < ApplicationController
  def index
    render json: {
      message: "ping"
    }
  end
end
