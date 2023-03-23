# Social_media_app
# Create Social Media Backend Server based on the following guidelines.
### - Create user model and crud operation
- implement Role based authentication where there are [admin,creator, user]	
### - Create Post Model and crud operation
### - Create Comments Model and crud operation
### - Create Review System where users* can create reviews for posts created by creators* (Review Model and crud operation)
### - Each user can have profile pictures 
--------------------------------------------------------------------------------------------------------------------------------
# Features : 
#### - Protect the apis so that only allowed Roles can use certain apis 
- Example: only admin role can delete creators,users,posts…
#### - When getting each post retrieve all its comments and reviews with it.
#### - When getting user retrieve its posts with it
#### - Protect sensitive information such as passwords form returning
#### - Implement request validation using Joi or similar packages
#### - Implement error handling strategy
#### - Structure the project
