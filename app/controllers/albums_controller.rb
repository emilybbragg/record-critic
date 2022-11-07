class AlbumsController < ApplicationController

  def index
    albums = Album.all
    render json: albums
  end

  def show
    album = Album.find(params[:id])
    render json: album
  end

  def create
    album = Album.create!(album_params)
    render json: album, status: :created
  end

  private

  def album_params
    params.permit(:name, :artist, :year, :image)
  end

end