
# 📷🖼 Yesul
A React-based social media application inspired by Pinterest that allows users to showcase their artwork, aesthetic photos, and other visual content, share their creative ideas, and connect with a community of like-minded people.  Users can create accounts, post content, engage with other users by liking and commenting on posts, and follow creators they admire.

## Pages and Functionality
 #### 🔐 User Authentication
 - Register
 - Login
 - Logout

 ![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

 ![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

 #### 🏡 Home page
 Displays all available posts
 - Features 
    - Browse through a feed of posts.
    - View post preview.
    - Navigate to detailed views of individual posts.

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

 #### 🖼 Details page
 Shows detailed information about a specific post.
 - Features 
    - View the full content of the post -> image, title, caption, post creator, number of likes and comments

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

User view: 
 - Features 
    - Like/Dislike post

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

Owner view:
 - Features 
    - Edit Post: Navigate to the edit form to update the post’s details.
    - Delete Post

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

 #### 👤 User profile page
Displays the profile of the user.

 - Features 
   - View the user’s profile picture, name, and bio.
   - Browse through posts created by the user.

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)  

User view:
- Features 
   - Follow/unfollow the certain user

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)  


Profile owner view:
- Features 
   - Liked Posts Button: View a list of posts you’ve liked.
   - Edit Profile Button: Navigate to the form to edit your profile.


![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

#### ➕ Create post page
Allows users to create a new post.

- Form fields 
  - Image (Required): Upload an image to be included in the post.
  - Title (Optional): Provide a title for the post.
  - Caption (Optional): Add a caption for the post.

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


#### ✏️🖼 Edit post page
Allows the post owner to edit their existing post.

- Form fields
  - Title: User can edit the title of the post. 
  - Caption: User can edit the posts's caption/description.

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

#### ✏️👤 Edit profile page
Allows the profile owner to update their profile information.

- Form fields
  - Profile picture: Update the profile picture.
  - Bio: Update bio.
  - Name: Change name.

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


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

## 🚀 Getting started

 ### Prerequisites
 Ensure you have the following installed on your system:
  - Node.js
  - npm 

 ### ⚙️ Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/anirdm/ReactJS-project.git
```
    
#### 2. Install Dependencies

```bash
npm install
```

#### 3. Run the Development Server
Start the Vite development server
```bash
npm run dev
```
