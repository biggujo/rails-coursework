# frozen_string_literal: true

# app/admin/dashboard.rb
ActiveAdmin.register_page "Dashboard" do # rubocop:disable Metrics/BlockLength
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do # rubocop:disable Metrics/BlockLength
    columns do
      column do
        panel "Recent Posts" do
          ul do
            Post.order(created_at: :desc).limit(5).map do |post|
              li link_to(post.content.truncate(30), admin_post_path(post))
            end
          end
        end
      end

      column do
        panel "Recent Comments" do
          ul do
            Comment.order(created_at: :desc).limit(5).map do |comment|
              li link_to(comment.text.truncate(30), admin_comment_path(comment))
            end
          end
        end
      end
    end

    columns do
      column do
        panel "Recent Users" do
          ul do
            User.order(created_at: :desc).limit(5).map do |user|
              li link_to(user.email, admin_user_path(user))
            end
          end
        end
      end

      column do
        panel "Recent Private Chats" do
          ul do
            PrivateChat.order(created_at: :desc).limit(5).map do |chat|
              li link_to("Chat between #{chat.user_1.nickname} and #{chat.user_2.nickname}",
                         admin_private_chat_path(chat))
            end
          end
        end
      end
    end

    columns do
      column do
        panel "Site Statistics" do
          div do
            "Total Users: #{User.count}"
          end
          div do
            "Total Posts: #{Post.count}"
          end
          div do
            "Total Comments: #{Comment.count}"
          end
          div do
            "Total Private Chats: #{PrivateChat.count}"
          end
        end
      end
    end
  end
end
