# rocketmanjr
Simple Angular + Flask + MongoDB Application with some CRUD operations

- Instructions on how to run each part of the challenge.
    Instructions for running the application.
    1. Unpack gitbundle.
        pipenv shell
    2. Seed the database (backend)
        cd backend
        flask initdb -v
    3. Run Python Flask application (backend)
        cd backend
        python app.py run
        - Test backend by running command: 
          pytest -v
    4. Run Angular application (frontend)
        cd frontend
        ng serve --open
        - Test Component B property's green-ness:
          ng test --include='**\tree-flat.component.spec.ts'
    5. Navigate to localhost:4200 in your preferred browser if the previous command does not bring up the app. 
    6. Enjoy using the simple app!



- Brief description of rationale behind each tool/language/framework of choice.

  My notes for completing this coding challenge:

  First things first, I looked into setting up my development environment. Started by getting my personal machine up to speed for development. Then I went into installing all the latest resources to build an Angular + Python application.

  I spent some time looking into some technologies I wanted to use. The last version of Angular I utilized was 7, and I knew I wanted to start back with the latest -- version 12.

  I knew I wanted to use a NoSQL database. In general, when you're not yet sure what your data will look like, No-Schema makes for quick prototyping and standing up of projects. Lately I have been using SQLite and MySQL databases and have been wanting to try something new. I chose MongoDB, and although I have not worked with it before, I have extensively used Microsoft Azure's NoSQL offering -- CosmoDB. I did consider using a GraphDB since I had experience with Neo4j.

  For the backend language, Python was my preferred over the other option, Node.js, seeing as I have not written in Node.js prior. Also, I was thinking this would be a good chance to set-up a small project using Flask, of which I have heard is very quick and easy to get an API going.

  And with any new problem I face, I generally start off by getting a better idea of what it is I am getting myself into. Thus, I went off in search of resources on the internet for "Angular CLI", "Flask", "MongoDB" in some combination. I did happen to stumble upon this https://github.com/reddimohan/angular-flask-mongodb which seems to be dated around ~2019. I did not use it at all, figuring it was too much trouble to use it. So I chunked it and just started from scratch.



- Brief description of key challenges (it’s okay to say you are not sure what you did was the best way to solve it. Be sure to justify your decision).
  Backend
    - Set-up MongoDB database
      - To simplify set-up for others, I set up this app's cluster on Mongodb Atlas, chose an AWS hosted cluster
      - https://stackoverflow.com/questions/55188518/mongodb-run-locally-or-through-atlas
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
      - I underestimated the data modeling. Originally, I had picked Marshmallow, a simple ORM, because it sounded cute and so I ran with it. But for this task, it was calling for a tree structure that worked well for a limitless-n nested children nodes. I was not convinced that an ORM or DTO(Data-transfer-object) was absolutely needed for this small challenge project.
      - I looked into MongoDB Tree Structures and chose the Array of Ancestors approach
        - https://stackoverflow.com/questions/26891484/mongodb-children-and-parent-structure
        - https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-ancestors-array/
      - Side note: I thought about implementing the API to use GraphQL, but that would alter the endpoint, deviating from the provided project challenge's requirements' specifications.
        - https://www.jitsejan.com/graphql-with-flask-and-mongodb
    - Unit test via PyTest
      - https://flask.palletsprojects.com/en/2.0.x/testing/
    - Resolved CORS issue between Angular + Flask application

  Frontend
    - Set-up of Angular CLI
      - The Angular docs were very helpful.
      - https://angular.io/cli
    - Component A
      - Realized I wanted a SwitchMap to switch to the most recent Observable. 
        https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap
      - I found an example which was a very good starting point: 
        https://stackblitz.com/edit/angular-live-search?file=src%2Fapp%2Fclient-switchmap%2Fclient-switchmap.component.ts
    - Component B
      - My first primitive implementation to speed along development was to simply "pretty-print" the json.
        https://stackblitz.com/edit/angular-prettyprint?file=src%2Fapp%2Fapp.component.html
      - To achieve a tree hierarchy data structure with conditional coloring, 'Delete' button, and 'date' pipe, I knew the implementation would need a more involved rendering.
      - I looked into mat-tree or Material Tree for Angular.
      - I also looked into a performant way to render using virtual-scroll which would show the limited data, cache, and if the user wanted to see it again, it would retrieve from cache, as opposed to creating it again.
        - My implementation heavily references this: 
          https://stackblitz.com/edit/simplified-material-tree-with-virtual-scroll
    - Dialog Component
      - I mostly used this as a solid baseline https://github.com/allabouttech0803/angular-reusable-dialog
        - Encountered an issue where the Mat-Dialog and the Tree-Flat components were in different zones. Rectified using NgZone to run them in the same zone. Delete Dialog and its animation now works! Deletes with progress bar, also cancels or clicks out of confirmation dialog. 
        https://github.com/angular/components/issues/7550
    - Date Pipe Component
      - I stored the created_at time for each node and property into MongoDB as an ISO Datetime. Made for easy piping to this component I found: 
        https://medium.com/@thunderroid/angular-date-ago-pipe-minutes-hours-days-months-years-ago-c4b5efae5fe5
    - Unit testing via spec files
        -
    - Material Angular
      - https://material.angular.io/
      - I referenced the docs quite a lot.

- Note any caveats of your solution and potential downfall.
  "Limitless-n" is always a caveat. I am unsure of the full scalability of the solution I have architected. Yes, I do have supporting documentation -- enough to have convinced myself, but seeing is believing. Once it scales and works in a real-world application, I will know it truly worked. 
  The virtual-scroll viewport I implemented is not set-up to live up to its full potential. It will need tweaks to reach peak caching performance if there are a large number of nodes, but the base intent is there. *Noted.

- Note what you would do differently in a production environment.
  This application would need environment configuration to connect resources, host URL, etc.
  Probably have a team to support me :)
      
  