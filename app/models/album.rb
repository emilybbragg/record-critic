class Album < ApplicationRecord

  has_many :reviews
  has_many :users, through: :reviews

  validates :name, presence: true, uniqueness: true
  validates :artist, presence: true
  validates :year, presence: true, length: { is: 4 }
  validates :image, presence: true

end
