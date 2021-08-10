# coding=utf-8

import click
import json
import datetime as dt
from markupsafe import escape
from pprint import pprint 
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import Database

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

@app.route('/seed', methods=['GET'])
def seed():
  try:
    """Seed DB."""
    with open('./backend/database_seed.json') as file:
      file_data = json.load(file)

    Database.refresh_db() # wipe the collection
    Database.seed_db(file_data) # seed the collection as desired
    
  except Exception as e: 
    # NOTE: Would add proper error handling with more time
    click.echo(e)
    click.echo('seed failed')
  
  else:
    click.echo('seed successful')


@app.route('/Rocket/', methods=['GET'], strict_slashes=False)
@app.route('/Rocket/<path:subpath>', methods=['GET'], strict_slashes=False)
def getNode(subpath=None):
  try:
    """Get Node."""
    if subpath:
      # query using the subpath after /Rocket/
      node = Database.load_from_db()

      return f'Subpath {escape(subpath)}'
    else:
      node = Database.load_node_from_db({ "id": "Rocket"})['node']
      return jsonify(node)

  except Exception as e: 
    # NOTE: Would add proper error handling with more time
    click.echo(e)
    click.echo('get node failed')

  else:
    click.echo('get node successful')
