# frozen_string_literal: true

class PrivateChatsController < ApiController
  before_action :authenticate_user!
  before_action :validate_create_params, only: [:create]

  def index
    private_chats = PrivateChat.where("user_1_id = ? OR user_2_id = ?", current_user.id, current_user.id)
    prepared_private_chats = private_chats.map {|chat| prepare_chat_render(chat) }
    sorted_private_chats = prepare_chat_sort(prepared_private_chats).reverse

    render json: sorted_private_chats
  end

  def show
    private_chat = PrivateChat.find(params[:id])

    render json: prepare_chat_render(private_chat)
  end

  def create
    user_1_id = params[:user_1]
    user_2_id = params[:user_2]

    # Make user_1_id always to be not bigger than user_2_id
    user_2_id, user_1_id = user_1_id, user_2_id if user_1_id > user_2_id

    private_chat = PrivateChat.get_private_chat(user_1_id, user_2_id).first

    # If not exists, create
    unless private_chat
      begin
        private_chat = PrivateChat.create!(user_1_id:, user_2_id:)
      rescue ActiveRecord::RecordInvalid => e
        render json: {message: "Record invalid: #{e.message}"}, status: :bad_request
        return
      end
    end

    render json: prepare_chat_render(private_chat)
  end

  private

  def prepare_chat_sort(private_chats)
    private_chats = private_chats.reject {|chat| chat[:latest_message].nil? }

    private_chats.sort_by do |hash|
      hash[:latest_message] ? hash[:latest_message][:created_at] : Time.at(0).getlocal
    end
  end

  def prepare_chat_render(private_chat)
    last_message = private_chat.messages.last

    {
      id: private_chat.id,
      user_1: UserSerializer.new(private_chat.user_1).to_h,
      user_2: UserSerializer.new(private_chat.user_2).to_h,
      latest_message: last_message,
      created_at: private_chat.created_at,
      updated_at: private_chat.updated_at
    }
  end

  def validate_create_params
    params.require(%i[user_1 user_2])
  rescue ActionController::ParameterMissing => e
    render json: {message: "Bad request: #{e.message}"}, status: :bad_request
  end
end
