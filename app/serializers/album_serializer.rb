class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :image, :year
end
