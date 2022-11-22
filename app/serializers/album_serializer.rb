class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :image, :year, :album_reviews

  has_many :reviews
  has_many :users, through: :reviews

  def album_reviews
    object.reviews.map do |review| 
      {
        id: review.id,
        title: review.title,
        description: review.description,
        rating: review.rating,
        username: review.user.username,
        user_id: review.user.id,
        album: review.album.name,
        album_id: review.album.id,
        artist: review.album.artist
      }
    end
  end
end
