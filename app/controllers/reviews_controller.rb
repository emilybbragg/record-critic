class ReviewsController < ApplicationController

  def index
    if params[:album_id]
      album = Album.find(params[:album_id])
      reviews = album.reviews
      render json: reviews
    else
      render json: { errors: ["No reviews yet"] }
    end
  end

  def show
    review = Review.find(params[:id])
    render json: review
  end

  def create
    # review = Review.create!(review_params)
    review = @current_user.reviews.create!(review_params)
    render json: review, status: :created
  end

  def update
    # return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    review = Review.find_by(id: params[:id])
    review.update!(review_params)
    # review = @current_user.reviews.update!(review_params)
    render json: review
  end

  def destroy
    # review = Review.find_by(id: params[:id])
    review = find_review
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
