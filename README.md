# Happits
## Habit Tracking and Social Media application

Happits is a habit-tracking social media web application that allows users to track their habits and interact with other users. Through an interactive dashboard, users can create custom habits and keep track of their progress by logging the completion of a habit on a given day. The analytics feature allows users to visualize their progress using a heat map and a weekly summary table. Furthermore, users can connect with other users by partnering with them, which allows users to view and interact with another user's profile. The Feed and Explore tabs allows users to view recent activity from other users and show their support.


Access the web application via: https://happits.netlify.app/ (currently unavailable)
### Features
**Login/Signup**:
- User is redirected to a login/signup page where a user may log into their existing account or create a new account
- When creating a new account, a user enters their name, email, username, and password

<img width="436" alt="Screen Shot 2022-08-02 at 8 14 45 PM" src="https://user-images.githubusercontent.com/68579388/182505391-1b7d0b64-8b35-42dc-96ef-11cb87d88a21.png">
<img width="420" alt="Screen Shot 2022-08-02 at 8 15 06 PM" src="https://user-images.githubusercontent.com/68579388/182505411-42a4d8d1-5f48-4252-9ef4-517849deba05.png">


**Dashboard**: a central place where a user can keep track of their habits, posts, analytics, and network
- My Info: this is a section that shows basic user information such as profile picture, username and name, and various analytics such as number of partners, requests, habits, posts, and logs. It also shows the Happits Score, which is calculated based on the other counts.
- Analytics: the heatmap shows the log activity within the past year. The table shows this week's logs for each of the user's habits.
- Habits: here, the user can create a new habit, edit existing habits, and create logs for their habits.
- Logs: the user can create new logs, see existing logs based on date, and edit/delete existing logs.
- Posts: the user can create new posts, view existing posts, and edit/delete existing posts.
<img width="1428" alt="Screen Shot 2022-08-02 at 8 32 14 PM" src="https://user-images.githubusercontent.com/68579388/182505483-4cb246dc-6c8b-49da-8ec5-6480b01678f2.png">
<img width="1434" alt="Screen Shot 2022-08-02 at 8 34 20 PM" src="https://user-images.githubusercontent.com/68579388/182505496-84d45318-12aa-4943-9158-acbf50b41de6.png">


**My Profile**: the profile page has two views (my profile view and another user profile view)
- My profile view: shows the same user information, habits, and posts section as the dashboard
- Another user's profile view: based on the visibility settings of the other user, the user can see a limited amount of information in the Info section, and a limited number of posts and habits.
  - Public: if a post or habit is public, any user can see it
  - Partner: only partners of the user can see the post/habit
  - Private: only the creator can see the post/habit

My Profile:
<img width="1435" alt="Screen Shot 2022-08-02 at 8 34 36 PM" src="https://user-images.githubusercontent.com/68579388/182505522-eeedc490-24c6-4c80-8c6c-70b4cf01295a.png">

Viewing someone else's profile: 
<img width="1435" alt="Screen Shot 2022-08-02 at 8 38 50 PM" src="https://user-images.githubusercontent.com/68579388/182505595-a1f2761e-17c7-42b1-b577-d97e8d6e5375.png">


**Feed**: shows recent activity of partners of the user
- Recent activity: this section shows recent habits, logs, and posts created by other users that are partners of the current user
  - the user can "support" the activity of other users by clicking the support icon. The number of supports of each activity is shown next to the icon.
- Parnters/Requests: the user can manage their network by accepting/rejecting partner requests, and removing existing partners
<img width="1435" alt="Screen Shot 2022-08-02 at 8 31 38 PM" src="https://user-images.githubusercontent.com/68579388/182505636-9b65ceac-67a5-4854-aeea-6854ff9c8103.png">
<img width="1423" alt="Screen Shot 2022-08-02 at 8 59 08 PM" src="https://user-images.githubusercontent.com/68579388/182507800-13c0d597-8163-4cc7-ac11-f50c018f8f90.png">


**Explore**: shows recent activity of public users
- Recent activity: this section shows recent habits, logs, and posts that are publicly created by other users. Thus, a user can see content from other users that are not part of their partner network.
<img width="1434" alt="Screen Shot 2022-08-02 at 8 35 33 PM" src="https://user-images.githubusercontent.com/68579388/182505626-cbf9383b-c923-453b-947a-2a137427277b.png">


### Content Creation
3 types of content can be created: habit, log, and post
Habit:
- Habits can be created/updated in the Habit Editor
- user specifies the name, description, goal, and visibility
- a goal can be set based on frequency (Times) or duration (Minutes). Furthermore, the length of the goal can be set as Daily, Weekly, or Monthly
- the visibility can be set to Public (visible to everyone), Partner (visible to partners), or Private (visible to self).
- <img width="502" alt="Screen Shot 2022-08-02 at 9 02 49 PM" src="https://user-images.githubusercontent.com/68579388/182508214-50987f78-1d59-4048-9c86-712b74f72e0d.png">

Log:
- Logs can be created/updated in the Log Editor
- Logs represent a record for a certain habit on a certain date
- Logs can have Success or Failure as outcomes
- The number field allows the user to keep track of how many times or minutes they accomplished a certain habit.
- <img width="502" alt="Screen Shot 2022-08-02 at 9 09 26 PM" src="https://user-images.githubusercontent.com/68579388/182508931-e06366df-409f-4d45-8f56-75818e20e6fd.png">

Post:
- Posts can be created/updated in the Post Editor
- Posts are ways a user can share their progress by uploading a picture, title, and description.
- Posts can be optionally associated with a habit
- <img width="507" alt="Screen Shot 2022-08-02 at 9 10 51 PM" src="https://user-images.githubusercontent.com/68579388/182509067-74606322-8ae6-4df9-b14b-941aa835ccd3.png">



## Development

This web application was created using the MERN stack (MongoDB, Express.js, React, and Node.js).


