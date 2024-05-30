require 'swagger_helper'

RSpec.describe 'Posts API', type: :request do
  path '/posts' do
    get 'Retrieves all posts' do
      tags 'Posts'
      produces 'application/json'

      response '200', 'Posts found' do
        schema type: :array, items: { '$ref' => '#/components/schemas/Post' }
        run_test!
      end
    end

    post 'Creates a post' do
      tags 'Posts'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :post, in: :body, schema: {
        type: :object,
        properties: {
          content: { type: :string },
          group_id: { type: :integer },
          reposted_post_id: { type: :integer }
        },
        required: ['content']
      }

      response '201', 'Post created' do
        schema type: :array, items: { '$ref' => '#/components/schemas/Post' }
        run_test!
      end

      response '422', 'Invalid request' do
        let(:post) { { content: '' } }
        run_test!
      end
    end
  end

  path '/posts/{id}' do
    get 'Retrieves a post' do
      tags 'Posts'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'Post found' do
        schema type: :array, items: { '$ref' => '#/components/schemas/Post' }
        run_test!
      end
    end

    patch 'Updates a post' do
      tags 'Posts'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer
      parameter name: :post, in: :body, schema: {
        type: :object,
        properties: {
          content: { type: :string }
        },
        required: ['content']
      }

      response '200', 'Post updated' do
        schema type: :array, items: { '$ref' => '#/components/schemas/Post' }
        run_test!
      end

      response '422', 'Invalid request' do
        let(:id) { Post.create(content: 'content', group_id: 1, reposted_post_id: 1).id }
        let(:post) { { content: '' } }
        run_test!
      end
    end

    delete 'Deletes a post' do
      tags 'Posts'
      consumes 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '204', 'Post deleted' do
        let(:id) { Post.create(content: 'content', group_id: 1, reposted_post_id: 1).id }
        run_test!
      end
    end
  end
end
