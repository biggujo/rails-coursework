# spec/integration/friends_spec.rb

require 'swagger_helper'

RSpec.describe 'Friends API', type: :request do
  path '/users/{user_id}/friends' do
    post 'Add a friend' do
      tags 'Friends'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string, description: 'User ID'
      parameter name: :friend, in: :body, schema: {
        type: :object,
        properties: {
          friend_id: { type: :integer }
        },
        required: ['friend_id']
      }

      response '201', 'Friend added successfully' do
        let(:user) { create(:user) }
        let(:friend) { create(:user) }
        let(:user_id) { user.id }
        let(:friend_id) { friend.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq('Friend added successfully')
        end
      end

      response '422', "Can't add yourself as a friend" do
        let(:user) { create(:user) }
        let(:user_id) { user.id }
        let(:friend_id) { user.id }

        run_test!
      end

      response '404', 'User not found' do
        let(:user_id) { 'invalid' }
        let(:friend_id) { 'invalid' }

        run_test!
      end
    end
  end

  path '/users/{user_id}/friends/{id}' do
    delete 'Remove a friend' do
      tags 'Friends'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string, description: 'User ID'
      parameter name: :id, in: :path, type: :string, description: 'Friend ID'

      response '200', 'Friend removed successfully' do
        let(:user) { create(:user) }
        let(:friend) { create(:user) }
        let(:user_id) { user.id }
        let(:id) { friend.id }

        before do
          user.friends << friend
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq('Friend removed successfully')
        end
      end

      response '404', 'User not found' do
        let(:user_id) { 'invalid' }
        let(:id) { 'invalid' }

        run_test!
      end
    end
  end

  path '/users/{user_id}/friends/mutual_friends' do
    get 'List mutual friends' do
      tags 'Friends'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string, description: 'User ID'

      response '200', 'Mutual friends found' do
        schema type: :array, items: { '$ref' => '#/components/schemas/User' }
        let(:user) { create(:user) }
        let(:user_id) { user.id }

        before do
          user.friends << create(:user)
          user.friends.first.friends << user
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to be_an_instance_of(Array)
        end
      end

      response '404', 'User not found' do
        let(:user_id) { 'invalid' }

        run_test!
      end
    end
  end

  path '/users/{user_id}/friends/followers' do
    get 'List followers' do
      tags 'Friends'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string, description: 'User ID'

      response '200', 'Followers found' do
        schema type: :array, items: { '$ref' => '#/components/schemas/User' }
        let(:user) { create(:user) }
        let(:user_id) { user.id }

        before do
          user.followers << create(:user)
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to be_an_instance_of(Array)
        end
      end

      response '404', 'User not found' do
        let(:user_id) { 'invalid' }

        run_test!
      end
    end
  end

  path '/users/{user_id}/friends/following' do
    get 'List following' do
      tags 'Friends'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string, description: 'User ID'

      response '200', 'Following found' do
        schema type: :array, items: { '$ref' => '#/components/schemas/User' }
        let(:user) { create(:user) }
        let(:user_id) { user.id }

        before do
          user.following << create(:user)
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to be_an_instance_of(Array)
        end
      end

      response '404', 'User not found' do
        let(:user_id) { 'invalid' }

        run_test!
      end
    end
  end
end

