# coding=utf-8

import click
import json
import datetime as dt
from pprint import pprint 
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import Database
from schemas import *

# creating the Flask application
app = Flask(__name__)
CORS(app) # Cross-Origin Resource Sharing

# Tie our application to the MongoDB Instance
Database.initialize()

if __name__ == '__main__':
  app.run(debug=True)

#"flask initdb" in CLI to refresh and seed the database.
@app.cli.command()
def initdb():
  try:
    """Initialize the database."""
    click.echo('Initializing the db')
    # Loading or Opening the json file
    with open('database_seed.json') as file:
      file_data = json.load(file)

    # add created_at datetime's to each node (JSON Object) of the seed structure
    created_time = dt.datetime.now()
    formatted_created_time = created_time.isoformat()
    # # Because I know the seed data, I can do this.. But it feels a little hacky to me.
    # file_data['Rocket'].append(formatted_created_time)
    # file_data['Stage1'].append(formatted_created_time)
    # file_data['Engine1'].append(formatted_created_time)
    # file_data['Engine2'].append(formatted_created_time)
    # file_data['Engine3'].append(formatted_created_time)
    # file_data['Stage2'].append(formatted_created_time)
    # file_data['Engine1'].append(formatted_created_time)

    # Could add date to every object

    # Load json into ORM - Marshmallow
    # schema = RocketSchema()
    # result = schema.load(file_data)
    # pprint(result)

    # Serialize json


    Database.refresh_db() # wipe the collection
    Database.seed_db(file_data) # seed the collection as desired
  except:
    click.echo('db seed failed')

  else:
    click.echo('db seed successful')

#All the routings in our app will be mentioned here.
@app.route('/test')
def test():
  return "This App is running"

@app.route('/user')
def user():
  user_data = {
      "email": "ken@yahoo.com",
      "name": "Ken"
  }
  schema = UserSchema()
  result = schema.load(user_data)
  pprint(result)
  # {'name': 'Ken',
  #  'email': 'ken@yahoo.com'},

@app.route('/seed')
def seed():
  # with open('./backend/database_seed.json', "r") as file:
  with open('./backend/database_seed.json') as file:
    # file_data = json.load(file)
    json_obj = json.load(file)
    # json_obj = json.load(file)
    # file_data = file

  # Load json into ORM - Marshmallow
  schema = RootSchema()
  result = schema.load(json_obj)
  pprint(result)
