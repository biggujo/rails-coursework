# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :author, class_name: "User"
  belongs_to :private_chat

  validates :private_chat, presence: true
  validates :author, presence: true
  validates :message, presence: true

  def self.ransackable_attributes(_auth_object=nil)
    %w[author_id created_at id id_value message private_chat_id updated_at]
  end

  def self.ransackable_associations(_auth_object=nil)
    %w[author private_chat]
  end
end
