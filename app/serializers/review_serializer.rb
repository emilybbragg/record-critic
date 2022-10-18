class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating

  belongs_to :user
  belongs_to :album
end