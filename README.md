
# 📷🖼 Artistetic 
A React-based social media application inspired by Pinterest that allows users to showcase their artwork, aesthetic photos, and other visual content, share their creative ideas, and connect with a community of like-minded people.  Users can create accounts, post content, engage with other users by liking and commenting on posts, and follow creators they admire.

## Pages and Functionality
 #### 🔐 User Authentication
 - Register
 - Login
 - Logout

 #### 🏡 Home page
 Displays all available posts
 - Features 
    - Browse through a feed of posts.
    - View post preview.
    - Navigate to detailed views of individual posts.

 #### 🖼 Details page
 Shows detailed information about a specific post.
 - Features 
    - View the full content of the post -> image, title, caption, post creator, number of likes and comments

User: 
 - Features 
    - Like/Dislike post

Owner:
 - Features 
    - Edit Post: Navigate to the edit form to update the post’s details.
    - Delete Post


 #### 👤 User profile page
Displays the profile of the user.

 - Features 
   - View the user’s profile picture, name, and bio.
   - Browse through posts created by the user.


User:
- Features 
   - Follow/unfollow the certain user


Profile owner:
- Features 
   - Liked Posts Button: View a list of posts you’ve liked.
   - Edit Profile Button: Navigate to the form to edit your profile.


#### ➕ Create post page
Allows users to create a new post.

- Form fields 
  - Image (Required): Upload an image to be included in the post.
  - Title (Optional): Provide a title for the post.
  - Caption (Optional): Add a caption for the post.

#### ✏️🖼 Edit post page
Allows the post owner to edit their existing post.

- Form fields
  - Title: User can edit the title of the post. 
  - Caption: User can edit the posts's caption/description.

#### ✏️👤 Edit profile page
Allows the profile owner to update their profile information.

- Form fields
  - Profile picture: Update the profile picture.
  - Bio: Update bio.
  - Name: Change name.


## ⚙️ Technologies

**Client-Side:** 
- **JavaScript** : The core programming language used for development.
- **React**: Framework for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **CSS Modules**: For modular and scoped styling of components.
- **react-responsive-masonry**: Provides responsive masonry layouts.
- **react-icons**: Offers a wide range of icons for React applications.


**Server-Side:**
- **Firebase**: Backend services including:
    - Authentication: Manages user authentication.
    - Firestore: Real-time database storage.
    - Storage: File storage and management.


**Form validation:**
- **Formik**: Manages form state and submissions.
- **Yup**: Provides schema-based validation for forms.
