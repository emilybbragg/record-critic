class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating
#   # , :album_id, :user_id
end