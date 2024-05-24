class PrivateChat < ApplicationRecord
  belongs_to :user_1, class_name: "User"
  belongs_to :user_2, class_name: "User"
  has_many :messages, dependent: :destroy

  validates :user_1, presence: true
  validates :user_2, presence: true
  validates_uniqueness_of :user_1_id, :scope => :user_2_id
  validate :cannot_chat_with_yourself
  validate :unique_chats

  # No need to check user_2_id = ? AND user_1_id = ? as always user_2_id is bigger than user_1_id
  scope :get_private_chat, -> (user_1_id, user_2_id) { where("user_1_id = ? AND user_2_id = ?", user_1_id, user_2_id) }

  private

  def cannot_chat_with_yourself
    errors.add(:user_1_id, "User cannot chat to himself.") if user_1_id == user_2_id
  end

  def unique_chats
    if PrivateChat.exists?(user_1_id: user_2_id, user_2_id: user_1_id)
      errors.add(:user_1_id, "Cannot create a chat with same users.")
    end
  end
end
