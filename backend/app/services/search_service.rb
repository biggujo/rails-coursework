# frozen_string_literal: true

class SearchService
  def initialize(query, current_user)
    @query = query
    @current_user = current_user
  end

  def call
    serialized_users + serialized_groups
  end

  private

  def search_users
    User.where("full_name ILIKE :name OR nickname ILIKE :name", name: "%#{@query}%")
  end

  def search_groups
    Group.where("name ILIKE :name", name: "%#{@query}%")
  end

  def serialized_users
    UserSerializer.new(search_users, params: {current_user: @current_user}).serializable_hash[:data].map {|user|
      user.merge(type: "user")
    }
  end

  def serialized_groups
    GroupSerializer.new(search_groups, params: {current_user: @current_user}).serializable_hash[:data].map {|group|
      group.merge(type: "group")
    }
  end
end
