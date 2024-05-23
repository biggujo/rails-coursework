class SharedChannel < ApplicationCable::Channel
  @channel_name = 'SharedChannel'

  def subscribed
    stream_from @channel_name
  end

  def receive(data)
    ActionCable.server.broadcast(@channel_name, data)
  end

  def unsubscribed
    stop_stream_from @channel_name
  end
end
