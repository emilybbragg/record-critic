# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Review.delete_all
Album.delete_all
User.delete_all



user1 = User.create(username: 'emilyb', password: 'musiclover')
user2 = User.create(username: 'alexblu', password: 'rhythmexpert')
user3 = User.create(username: 'julianna', password: 'ilovets')


album1 = Album.create(name: 'Reputation', artist: 'Taylor Swift', year: 2017, image: 'https://people.com/thmb/6cK43NG6zsGRJFZaeriE_TMrV0Y=/1987x2000/filters:fill(auto,1)/taylor-swift7-2000-48f9bfb372c34e36866773b1ede0b372.jpg')
album2 = Album.create(name: 'Blond', artist: 'Frank Ocean', year: 2016, image: 'https://hips.hearstapps.com/ell.h-cdn.co/assets/16/34/480x480/square-1471882460-frank-ocean-blonde.jpg?resize=640:*')
album3 = Album.create(name: 'Five Seconds Flat', artist: 'Lizzy McAlpine', year: 2022, image: 'https://m.media-amazon.com/images/I/61yOgCSSemL._SS500_.jpg')


review1 = Review.create(title: 'Best Album Ever', description: 'This is my favorite album of all time', rating: 5, user_id: user1.id, album_id: album1.id)
review2 = Review.create(title: 'An Oldie But Goodie', description: 'Definitely find myself going back and listening to this album!', rating: 4, user_id: user2.id, album_id: album2.id)
review3 = Review.create(title: 'A New Favorite', description: 'Had never heard of this artist before - love it!', rating: 4, user_id: user3.id, album_id: album3.id)


puts "✍🏻🗒️ DB seeded!"