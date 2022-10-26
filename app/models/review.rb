class Review < ApplicationRecord

  belongs_to :user
  belongs_to :album

  validates :title, presence: true
  validates :description, presence: true
  validates :rating, presence: true, length: { is: 1 }
  
end