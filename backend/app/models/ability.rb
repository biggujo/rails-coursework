# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, Post do |post|
      post.user == user || post.co_authors.include?(user)
    end
    can :manage, Comment, user: user
  end
end
