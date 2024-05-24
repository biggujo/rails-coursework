class PrivateChannel < ApplicationCable::Channel
  def subscribed
    stream_from params[:room]
  end

  def receive(data)
    built_message = {
      author_id: current_user.id,
      body: data['body']
    }

    ActionCable.server.broadcast(params[:room], built_message)
  end

  def unsubscribed
    stop_stream_from params[:room]
  end
end
