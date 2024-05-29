class PrivateChannel < ApplicationCable::Channel
  def subscribed
    # Create if not exists
    get_private_chat(params)

    stream_from params[:room]
  end

  def receive(data)
    private_chat = get_private_chat(params)

    message = Message.create(private_chat_id: private_chat.id,
                             author_id: current_user.id,
                             message: data["body"])

    ActionCable.server.broadcast(params[:room], message)
  end

  def unsubscribed
    stop_stream_from params[:room]
  end

  private

  def get_private_chat(params)
    user_1_id, user_2_id = parse_room_id(params)

    private_chat = PrivateChat.get_private_chat(user_1_id, user_2_id).first

    private_chat ||= PrivateChat.create(user_1_id:, user_2_id:)

    private_chat
  end

  # Split "id1_id2" to id1 and id2
  def parse_room_id(params)
    user_1_id, user_2_id = params[:room].split("_")
    [user_1_id.to_i, user_2_id.to_i]
  end
end
