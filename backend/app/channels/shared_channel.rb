class SharedChannel < ApplicationCable::Channel
  @channel_name = 'SharedChannel'

  def subscribed
    stream_from @channel_name
  end

  def receive(data)
    built_message = {
      author_id: current_user.id,
      body: data['body']
    }

    ActionCable.server.broadcast(@channel_name, built_message)
  end

  def unsubscribed
    stop_stream_from @channel_name
  end
end
