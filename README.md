# rocketmanjr
Simple Angular + Flask + MongoDB Application with some CRUD operations

Notes for completing this coding challenge:

First things first, I looked into setting up my development environment by installing all the latest to build an Angular + Python application.

I spent some time looking into some technologies I want to use. The last version of Angular I utilized was 7, and so I wanted to start back with the latest(12).

I wanted to use a NoSQL database because, in general, they make for quick prototyping and standing up of projects, especially when you're not yet sure what your data will look like. Lately I have been using SQLite and MySQL databases and have been wanting to try something new. I chose MongoDB, and although I have not worked with it before, I have extensively used Microsoft Azure's NoSQL offering -- CosmoDB.

For the backend language, Python was my preferred over the other option of Node.js. I have never written code in Node.js. Also, I was thinking this would be a good chance to set-up a small project using Flask, of which I have heard is very quick and easy to get an API going.

And with any new problem I face, I generally start off by getting a better idea of what it is I am getting myself into. Thus, I went off in search of resources on the internet for "Angular CLI", "Flask", "MongoDB" in some combination. I did happen to stumble upon this https://github.com/reddimohan/angular-flask-mongodb which seems to be dated around ~2019. I figured it was too much trouble to use it; chunked it and just started from scratch.

Backend
  - Set-up MongoDB database
    - https://stackoverflow.com/questions/55188518/mongodb-run-locally-or-through-atlas
    - To simplify set-up for others, I set up this app's cluster on Mongodb Atlas, chose an AWS hosted cluster
  - Populated the MongoDB database
    - Created a script to: 
        - Wipe the db
        - Seed the database with the rocket entry
    - https://flask.palletsprojects.com/en/0.12.x/cli/#custom-commands
  - Set-up Python application to use virtual environments
    - I have never used python's virtual env's so thought this would be a good time to try it out
    - https://realpython.com/pipenv-guide/#pipenv-introduction
  - Set-up Flask
    - https://pythonbasics.org/flask-tutorial-hello-world/
  - API
    - Utilized PyMongo's library to interface with MongoDB Atlus.
    - I underestimated the data modeling. Originally, I had picked Marshmallow, a simple ORM, because it sounded cute and so I ran with it. But for this task, it was calling for a tree structure that worked well for a limitless-n nested children nodes. I was not sold that an ORM or DTO(Data-transfer-object) was absolutely needed for this small project. In the future, surely.
    - I looked into MongoDB Tree Structures. 
        - Chose the Array of Ancestors approach
        - https://stackoverflow.com/questions/26891484/mongodb-children-and-parent-structure
        - https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-ancestors-array/
    - Side note: I thought about implementing the API to use GraphQL, but that would alter the endpoint, deviating from the provided project challenge's requirements' specifications.
        - https://www.jitsejan.com/graphql-with-flask-and-mongodb
  - Resolved CORS issue between Angular + Flask application

Frontend
  - Set-up of Angular CLI
    - The Angular docs were very helpful.
    - https://angular.io/cli
  - Component A
    - Realized I wanted a SwitchMap to switch to the most recent Observable. https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap
    - I found an example which was a good starting point: https://stackblitz.com/edit/angular-live-search?file=src%2Fapp%2Fclient-switchmap%2Fclient-switchmap.component.ts
  - Component B
    - My first primitive implementation to speed along development was to simply "pretty-print" the json.
      - https://stackblitz.com/edit/angular-prettyprint?file=src%2Fapp%2Fapp.component.html
    - To achieve a tree hierarchy data structure with conditional coloring, 'Delete' button, and 'date' pipe, I knew the implementation would need a more involved rendering
    - I looked into mat-tree or Material Tree for Angular.
    - I also looked into a performant way to render using virtual-scroll which would show the limited data, cache, and if the user wanted to see it again, it would retrieve from cache, as opposed to creating it again.


Instructions to run the application.
1. Unpack gitbundle.
    pipenv shell
2. Seed the database
    cd backend
    flask initdb -v
3. Run Python Flask appliaction
    cd backend
    python app.py run
    - Test backend by running command: pytest -v
4. Run Angular application
    cd frontend
    ng serve --open
5. Navigate to localhost:4200 in your preferred browser if the previous command does not bring up the app. 
6. Enjoy using the simple app!