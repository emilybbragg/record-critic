class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :image, :year

  has_many :reviews
end
