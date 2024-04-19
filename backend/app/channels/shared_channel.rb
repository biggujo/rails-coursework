class SharedChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'SharedChannel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
