# frozen_string_literal: true

require "swagger_helper"

# rubocop:disable Metrics/BlockLength
RSpec.describe "Comments API", type: :request do
  path "/posts/{post_id}/comments" do
    post "Creates a comment" do
      tags "Comments"
      consumes "application/json"
      produces "application/json"
      parameter name: :post_id, in: :path, type: :integer
      parameter name: :comment, in: :body, schema: {
        type: :object,
        properties: {
          text: {type: :string}
        },
        required: ["text"]
      }

      response "201", "Comment created" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Comment"}
        let(:post_id) { Post.create(content: "content", group_id: 1, reposted_post_id: 1).id }
        let(:comment) { {text: "text"} }
        run_test!
      end

      response "422", "Invalid request" do
        let(:post_id) { Post.create(content: "content", group_id: 1, reposted_post_id: 1).id }
        let(:comment) { {text: ""} }
        run_test!
      end
    end

    get "Retrieves a post's comments" do
      tags "Comments"
      produces "application/json"
      parameter name: :post_id, in: :path, type: :integer

      response "200", "Comments found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Comment"}

        let(:post_id) { Post.create(content: "content", group_id: 1, reposted_post_id: 1).id }
        run_test!
      end
    end
  end

  path "/posts/{post_id}/comments/{id}" do
    patch "Updates a comment" do
      tags "Comments"
      consumes "application/json"
      produces "application/json"
      parameter name: :post_id, in: :path, type: :integer
      parameter name: :id, in: :path, type: :integer
      parameter name: :comment, in: :body, schema: {
        type: :object,
        properties: {
          text: {type: :string}
        },
        required: ["text"]
      }

      response "200", "Comment updated" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Comment"}
        let(:post_id) { Post.create(content: "content", group_id: 1, reposted_post_id: 1).id }
        let(:id) { Comment.create(text: "text", post_id:, user_id: 1).id }
        let(:comment) { {text: "updated text"} }
        run_test!
      end

      response "422", "Invalid request" do
        let(:post_id) { Post.create(content: "content", group_id: 1, reposted_post_id: 1).id }
        let(:id) { Comment.create(text: "text", post_id:, user_id: 1).id }
        let(:comment) { {text: ""} }
        run_test!
      end
    end

    get "Gets a comment" do
      tags "Comments"
      produces "application/json"
      parameter name: :post_id, in: :path, type: :integer
      parameter name: :id, in: :path, type: :integer

      response "200", "Comments found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Comment"}
        let(:id) { create(:comment).id }
        run_test!
      end

      response "404", "Comment not found" do
        let(:id) { "invalid" }
        run_test!
      end
    end

    delete "Deletes a comment" do
      tags "Comments"
      consumes "application/json"
      parameter name: :post_id, in: :path, type: :integer
      parameter name: :id, in: :path, type: :integer

      response "204", "Comment deleted" do
        let(:post_id) { Post.create(content: "content", group_id: 1, reposted_post_id: 1).id }
        let(:id) { Comment.create(text: "text", post_id:, user_id: 1).id }
        run_test!
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
