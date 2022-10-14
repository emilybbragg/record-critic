class ReviewsController < ApplicationController

  # def index 
  #   reviews = Review.all
  #   render json: reviews
  # end

  # def show 
  #   review = review
  #   render json: review
  # end

  # def create 
  #   review = Review.create!(review)
  #   render json: review, status: :created
  # end


  def index
    if params[:album_id]
      album = Album.find(params[:album_id])
      reviews = album.reviews
      render json: reviews, include: :album
    else
      render json: { errors: ["No reviews yet"] }
    end
  end

  # def index
  #   render json: Review.all
  # end

  def create
    review = Review.create(review_params)
    render json: review, status: :created
  end

  # def update
  #   review = find_review
  #   review.update!(review_params)
  #   render json: review
  # end

  # def destroy 
  #   review = find_review
  #   review.destroy
  #   head :no_content
  # end

  private

  def find_review
      Review.find(params[:id])
  end

  def review_params
      # params.permit(:title, :description, :rating, :user_id, :album_id)
      params.permit(:title, :description, :rating)

  end


end
