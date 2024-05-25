class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    private_chat_id = params[:private_chat_id]

    private_chat = PrivateChat.find(private_chat_id)

    unless private_chat
      render json: {
        metadata: nil,
        items: []
      }
    end

    private_chat_messages = PrivateChat.find(private_chat_id).messages

    metadata, items = pagy(private_chat_messages, items: 20, outset: params[:offset])

    render json: {
      metadata: metadata,
      items: items
    }
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
