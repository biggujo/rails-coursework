class Post < ApplicationRecord
  belongs_to :user
  has_many :comments

  acts_as_votable

  def as_json(options = {})
    super(options.merge(
      methods: [:likes_count, :dislikes_count]))
  end

  def likes_count
    self.get_upvotes.size
  end

  def dislikes_count
    self.get_downvotes.size
  end
end
