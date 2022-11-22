class ReviewsController < ApplicationController

  def index
    if params[:album_id]
      album = Album.find(params[:album_id])
      reviews = album.reviews
      render json: reviews
    else
      reviews = @current_user.reviews
      render json: reviews
    end
  end

  def create
    review = @current_user.reviews.create!(review_params)
    render json: review
  end

  def update
    review = @current_user.reviews.find(params[:id])
    review.update!(review_params)
    render json: review
  end

  def destroy
    review = @current_user.reviews.find(params[:id])
    review.destroy
    head :no_content
  end

  private

  def find_review
    Review.find(params[:id])
  end

  def review_params
    params.permit(:title, :description, :rating, :album_id)

  end

end