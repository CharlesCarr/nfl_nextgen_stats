# NFL Next Gen Stats Dashboard Web App

[Live App Link](https://react-nfl.onrender.com/)

NFL Stats dashboard web app using AWS's Next Gen NFL Stats. Built with React/TypeScript/TailwindCSS on frontend and using Python/Flask for the API to retrieve the AWS stats.

## Project Description

I designed and built this mobile friendly, responsive workout NFL stats dashboard with React.js and Flask. I used TailwindCSS to style the application after creating a design in Figma. I found a python package that connected to the AWS NFL Next Gen stats so I created a backend using Python's Flask framework.
## Screenshots
![App Image (Dark Mode) 1](../frontend/src/images/app/appDark.png)
![App Image (Light Mode) 1](/screenshots/AllWorkouts.png)
![App Image (Mobile) 1](/screenshots/SelectTodayWorkout.png)
![App Image (Mobile) 2](/screenshots/AllWorkoutsResponsive.png)

#### Areas of Focus
- Creating mobile first design in Figma
- Creating backend first to access data using Python and Flask (filtering/manipulating data to app's needs)
- TypeScript for type checking and a cleaner development process
- React.js for single page application creating reusable components
- Building custom React hooks with error handling for fetching data from backend
- Using React Redux and Redux Toolkit for app wide state management
- Styling responsively with TailwindCSS utility classes (also added a light/dark mode state)
- Creating dynamic, animated chart component to display selected data

#### Challenges
One of the bigger challenges of this project was accessing the appropriate data for NFL statistics. After little success with finding free external APIs that provided access to the data I was looking for, I found a python package that provided AWS Next Gen NFL stats. At the start, I had little experience with developing in Python but I was able to overcome this and created this Flask backend API for myself to use on the frontend.

## Flow of Application / How to Navigate

1. User loads the page and the initial state is set to viewing Josh Allen's passing stats.
2. The user has access to his Passing Yards, Passing TDs, and Passer Rating for the most recent week, season, and all time (AWS data goes back to 2016).
3. On the main dashboard the user also has access to a chart for a specific stat of the user's choosing
4. Additionally, the user can view this selected stat's season leaders in a smaller side component (top 3 players of the stat)


## Background

#### Why I Built This
As the NFL and fantasy football season started I wanted to develop an app for myself and my fantasy league to track different statistics. I find it interesting to track these statistics and gain insights by looking at the data in different ways that might not be available in other apps. At the time I had also come across some interesting design inspiration for dashboards that helped guide my own design for this application.

#### Potential Next Steps
- Currently the app only serves passing statistics (QBs), my plan for immediate next steps is introduce new endpoints for other stat categories like rushing and receiving (would then introduce React Router for routing)
- Going further, I would like to dig further into Python for data analysis and come up with more novel insights by comparing different statistics
- Additionally, I would like to add different data visualizations
- I would also like to create the option for a profile but not a requirement so that the user can save filters - for example if a user wanted to track specific fantasy players they had on their team
- Also there are some lesser known and tracked stats that are available in the Next Gen stats that could be cool to look into as well

## Hosting

Hosted both frontend and backend with Render [My Workout App](https://react-nfl.onrender.com/)


