# frozen_string_literal: true

require "swagger_helper"

# rubocop:disable Metrics/BlockLength
RSpec.describe "Likes API", type: :request do
  path "/like" do
    post("like an item") do
      tags "Likes"
      consumes "application/json"
      produces "application/json"
      parameter name: :like, in: :body, schema: {
        type: :object,
        properties: {
          likeable_type: {type: :string, enum: %w[Post Comment], description: "Type of the item to like"},
          likeable_id: {type: :integer, description: "ID of the item to like"}
        },
        required: %w[likeable_type likeable_id]
      }

      response(200, "successful") do
        schema type: :object, properties: {
          likeable: {type: :object},
          likes_count: {type: :integer},
          dislikes_count: {type: :integer}
        }

        let(:like) { {likeable_type: "Post", likeable_id: 1} }

        after do |example|
          example.metadata[:response][:content] = {
            "application/json" => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path "/dislike" do
    post("dislike an item") do
      tags "Likes"
      consumes "application/json"
      produces "application/json"
      parameter name: :like, in: :body, schema: {
        type: :object,
        properties: {
          likeable_type: {type: :string, enum: %w[Post Comment], description: "Type of the item to dislike"},
          likeable_id: {type: :integer, description: "ID of the item to dislike"}
        },
        required: %w[likeable_type likeable_id]
      }

      response(200, "successful") do
        schema type: :object, properties: {
          likeable: {type: :object},
          likes_count: {type: :integer},
          dislikes_count: {type: :integer}
        }

        let(:like) { {likeable_type: "Comment", likeable_id: 1} }

        after do |example|
          example.metadata[:response][:content] = {
            "application/json" => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
