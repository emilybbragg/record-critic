class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :reviews

  has_many :reviews
  has_many :albums, through: :reviews

  def reviews
    object.reviews.map do |review| 
      {
        id: review.id,
        title: review.title,
        description: review.description,
        rating: review.rating,
        username: review.user.username,
        user_id: review.user.id,
        album: review.album,
        album_id: review.album.id,
        artist: review.album.artist
      }
    end
  end

end
