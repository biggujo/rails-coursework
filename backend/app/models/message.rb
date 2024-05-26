class Message < ApplicationRecord
  belongs_to :author, class_name: "User"
  belongs_to :private_chat

  validates :private_chat, presence: true
  validates :author, presence: true
  validates :message, presence: true
end
