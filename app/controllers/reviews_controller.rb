class ReviewsController < ApplicationController

  def index
    if params[:album_id]
      album = Album.find(params[:album_id])
      reviews = album.reviews
      render json: reviews
    elsif params[:user_id]
      user = User.find(params[:user_id])
      reviews = user.reviews
      render json: reviews
    else
      render json: { errors: ["No reviews yet"] }
    end
  end

  def create
    review = @current_user.reviews.create!(review_params)
    render json: review, status: :created
  end

  def update
    review = find_review
    review.update!(review_params)
    render json: review
  end

  def destroy
    review = find_review
    review.destroy
    head :no_content
  end

  private

  def find_review
      Review.find(params[:id])
  end

  def review_params
    params.permit(:title, :description, :rating, :album_id, :user_id)
  end

end