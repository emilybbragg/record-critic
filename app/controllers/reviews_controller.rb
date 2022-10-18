class ReviewsController < ApplicationController

  def index
    if params[:album_id]
      album = Album.find(params[:album_id])
      reviews = album.reviews
      render json: reviews
      # , include: :album
    else
      render json: { errors: ["No reviews yet"] }
    end
  end

  def show
    review = Review.find(params[:id])
    render json: review
  end

  def create
    review = Review.create(review_params)
    render json: review, status: :created
  end

  def update
    review = find_review
    review.update!(review_params)
    render json: review
  end

  # def destroy 
  #   review = find_review
  #   review.destroy
  #   head :no_content
  # end

  def destroy
    review = Review.find_by(id: params[:id])
    if review
      review.destroy
      head :no_content
    else
      render json: { error: "Review not found" }, status: :not_found
    end
  end

  private

  def find_review
      Review.find(params[:id])
  end

  def review_params
    params.permit(:title, :description, :rating, :album_id, :user_id)
  end

end
