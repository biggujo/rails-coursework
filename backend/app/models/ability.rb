# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can(:manage, Post, user:)
    can(:manage, Comment, user:)
    can :manage, Group, user:
  end
end
