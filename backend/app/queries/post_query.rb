# frozen_string_literal: true

class PostQuery
  def initialize(relation=Post.all)
    @relation = relation
  end

  def call(params={})
    scoped = @relation
    scoped = filter_by_content(scoped, params[:content]) if params[:content].present?
    if params[:start_date].present? && params[:end_date].present?
      scoped = filter_by_date_range(scoped, params[:start_date],
                                    params[:end_date])
    end
    scoped = sort_by_activity(scoped, params[:sort_activity]) if params[:sort_activity].present?
    scoped = sort_by_date(scoped, params[:sort_date]) if params[:sort_date].present?
    scoped
  end

  private

  def filter_by_content(relation, content)
    relation.where("content LIKE ?", "%#{content}%")
  end

  def filter_by_date_range(relation, start_date, end_date)
    relation.where(created_at: start_date..end_date)
  end

  def sort_by_activity(relation, direction)
    votable_type = relation.klass.name
    relation
      .joins("LEFT JOIN votes ON votes.votable_type = '#{votable_type}' AND votes.votable_id = #{relation.table_name}.id")
      .group("#{relation.table_name}.id")
      .order(Arel.sql("COUNT(votes.id) #{direction}"))
  end

  def sort_by_date(relation, direction)
    relation.order(created_at: direction)
  end
end
