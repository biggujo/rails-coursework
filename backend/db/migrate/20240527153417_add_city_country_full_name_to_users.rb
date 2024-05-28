class AddCityCountryFullNameToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :country, :string, null: false, default: "Ukraine"
    add_column :users, :city, :string, null: false, default: "Kyiv"
    add_column :users, :full_name, :string, null: false, default: "John Smith"
  end
end
