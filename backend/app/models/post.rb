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

  def self.ransackable_attributes(auth_object = nil)
    %w[content created_at group_id id id_value reposted_post_id updated_at user_id]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[comments group repost user votes_for]
  end

  def display_name
    "Post ##{id}"
  end
end
