class AlbumsController < ApplicationController

  def index
    albums = Album.all
    render json: albums, include: :reviews
  end

  def show
    album = find_album
    render json: album, include: :reviews
  end

  # def show
  #   album = Album.find_by(id: params[:id])
  #   render json: album
  # end


  def create
    album = Album.create(album_params)
    render json: album, status: :created
  end

  private

  def find_album
    Album.find(params[:id])
  end

  def album_params
    params.permit(:name, :artist, :year, :image)
  end

end
