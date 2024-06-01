# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  belongs_to :group, optional: true
  has_many :comments, dependent: :destroy
  belongs_to :repost, optional: true, class_name: "Post", foreign_key: :reposted_post_id # rubocop:disable Rails/InverseOf

  has_many_attached :photos

  validates :title, presence: true
  validates :content, presence: true
  validates :user, presence: true

  acts_as_votable

  def likes_count
    get_upvotes.size
  end

  def dislikes_count
    get_downvotes.size
  end
end
