# frozen_string_literal: true

class PrivateChat < ApplicationRecord
  belongs_to :user_1, class_name: "User"
  belongs_to :user_2, class_name: "User"
  has_many :messages, dependent: :destroy

  validates :user_1, presence: true
  validates :user_2, presence: true
  # Here is a disabled cop as it gives a false alarm
  validates :user_1_id, uniqueness: {scope: :user_2_id}
  validate :cannot_chat_with_yourself
  validate :unique_chats

  # No need to check user_2_id = ? AND user_1_id = ? as always user_2_id is bigger than user_1_id
  scope :get_private_chat, ->(user_1_id, user_2_id) { where("user_1_id = ? AND user_2_id = ?", user_1_id, user_2_id) }

  def self.ransackable_attributes(auth_object = nil)
    %w[created_at id id_value updated_at user_1_id user_2_id]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[messages user_1 user_2]
  end

  private

  def cannot_chat_with_yourself
    errors.add(:user_1_id, "User cannot chat to himself.") if user_1_id == user_2_id
  end

  def unique_chats
    return unless PrivateChat.exists?(user_1_id: user_2_id, user_2_id: user_1_id)

    errors.add(:user_1_id, "Cannot create a chat with same users.")
  end
end
