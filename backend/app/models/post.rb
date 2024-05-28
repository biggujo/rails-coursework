class Post < ApplicationRecord
  belongs_to :user
  belongs_to :group, optional: true
  has_many :comments
  belongs_to :repost, optional: true, class_name: 'Post', foreign_key: :reposted_post_id

  acts_as_votable

  def likes_count
    self.get_upvotes.size
  end

  def dislikes_count
    self.get_downvotes.size
  end
end
