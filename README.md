# Capstone Tennis Club Installation and Startup instructions

To start, I want to thank you for taking the time to view my capstone project! The following is the result of 6 months of hard work and dedication but, is also a continual work in progress and is a project I plan to continue to grow. Therefore, if you have any questions or run into any problems please do not hesitate to contact me at graysonslater@gmail.com and I will promptly respond! 

Also, I ran this project using a WSL terminal and recommend you do the same to avoid running into any issues!


## Running the project on LocalHost

1. Clone the main branch from the github repository.

2. Install dependencies.

   ```
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file from the variables in the example.example file 

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. To run the backend, get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```
   pipenv shell
   ```

   ```
   flask db upgrade
   ```

   ```
   flask seed all
   ```

   ```
   flask run
   ```

7.Next, To run the front end open up a second terminal by clicking the plus icon in the top right corner of VScodes local terminal

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. 

9. with your backedn and frontend running at the same time you should be able to access the app on your browser at localhost port 5173


## Access through Render.com

To access this app from an online server, simply navigate to https://capstone-tennis-club.onrender.com