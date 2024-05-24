class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    private_chat_id = params[:private_chat_id]
    private_chat_messages = PrivateChat.find(private_chat_id).messages

    render json: private_chat_messages
  end

  def create
    private_chat_id = params[:private_chat_id]
    message_text = params[:message]

    author_id = current_user.id

    begin
      message = Message.create!(private_chat_id: private_chat_id,
                                author_id: author_id,
                                message: message_text)
    rescue ActiveRecord::RecordInvalid => e
      render json: { message: "Record invalid: #{e.message}" }, status: :bad_request
      return
    end

    render json: message
  end
end
