class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating, :user_id, :album_id

  belongs_to :user
  belongs_to :album

end