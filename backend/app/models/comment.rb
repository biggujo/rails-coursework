# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :text, presence: true
  validates :user, presence: true
  validates :post, presence: true

  acts_as_votable

  def likes_count
    get_upvotes.size
  end

  def dislikes_count
    get_downvotes.size
  end
end
