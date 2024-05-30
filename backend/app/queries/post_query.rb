# frozen_string_literal: true

class PostQuery
  def initialize(relation=Post.all)
    @relation = relation
  end

  def call(params={})
    scoped = @relation
    scoped = filter_by_content(scoped, params)
    scoped = filter_by_date_range(scoped, params)
    scoped = sort_by_activity(scoped, params)
    sort_by_date(scoped, params)
  end

  private

  def filter_by_content(scoped, params)
    content = params[:content]

    return scoped unless content

    scoped.where("content LIKE ?", "%#{content}%")
  end

  def filter_by_date_range(scoped, params)
    start_date = params[:start_date]
    end_date = params[:end_date]

    return scoped if !start_date || !end_date

    scoped.where(created_at: start_date..end_date)
  end

  def sort_by_activity(scoped, params)
    direction = params[:sort_activity]

    return scoped unless direction

    votable_type = scoped.klass.name

    left_join = "LEFT JOIN votes ON votes.votable_type = '#{votable_type}' " \
                "AND votes.votable_id = #{scoped.table_name}.id"

    scoped
      .joins(left_join)
      .group("#{scoped.table_name}.id")
      .order(Arel.sql("COUNT(votes.id) #{direction}"))
  end

  def sort_by_date(scoped, params)
    direction = params[:sort_date]

    return scoped.order(created_at: "DESC") unless direction

    scoped.order(created_at: direction)
  end
end
