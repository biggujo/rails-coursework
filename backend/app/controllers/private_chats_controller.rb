class PrivateChatsController < ApplicationController
  before_action :authenticate_user!

  def my_chats
    render json: PrivateChatSerializer.new(PrivateChat.where("user_1_id = ? OR user_2_id = ?", current_user.id, current_user.id)).to_h
  end

  def show
    render json: {
      chat: PrivateChatSerializer.new(PrivateChat.find(params[:id].to_i)).to_h,
      messages: MessageSerializer.new(Message.where(private_chat_id: params[:id])).to_h
    }
  end
end
