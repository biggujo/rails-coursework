# frozen_string_literal: true

class SharedChannelController < ApplicationController
  def index
    ActionCable.server.broadcast "SharedChannel", "Hello from the Rails app."
  end
end
