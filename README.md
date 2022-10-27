### Overview
Record Critic is an application designed for users to rate and review albums. This app is built with a React frontend and a Ruby-on-Rails backend.

### Running the Application
To run the backend of this application, run the following commands in a terminal:
`bundle install` (to install dependencies)
`rails db:seed` (to seed database)
`rails s` (to run rails server)

To run the frontend of this application, run the following commands in a separate terminal:
`npm install` --prefix client (to install dependencies)
`npm start` --prefix client (to start React server)

### Features and How to Use
Users can login to their account by using their previously created username and password. If users to not have an account, they can create an account via the signup feature.

Logging in directs users to the main page of all albums that are available to review. Users can add an album, and are required to enter an album title, artist, release year, and url to the cover image. Users can see all available reviews by selecting the "See Album Reviews" button.

Upon selecting an album, users can view all available reviews as well as leave one of their own. Reviews require a title, description, and rating (out of 5). Additionally, they can edit and delete their own reviews by clicking the respective icons.

Users can logout by clicking the respective icon, and will be redirected to the login page.

### Technologies Used
- React
- CSS
- Ruby-on-Rails