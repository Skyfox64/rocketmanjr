# coding=utf-8

import click
import json
import datetime as dt
from markupsafe import escape
from pprint import pprint 
from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import json_util
from bson.json_util import dumps, loads
from api_helper import ApiHelper
from database import Database

# Creating the Flask application
app = Flask(__name__)
CORS(app) # Cross-Origin Resource Sharing

# Tie our application to the MongoDB Instance
Database.initialize()

# Run
if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)

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
    Database.create_db_index("ancestors") #index off of 'ancestors' to boost performance
    # Database.create_db_index("parent")
  except:
    click.echo('db seed failed')
  else:
    click.echo('db seed successful')

#All the routings in our app will be mentioned below.
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
    Database.create_db_index("ancestors")
    # Database.create_db_index("parent")
    
  except Exception as e: 
    # NOTE: Would add proper error handling with more time
    click.echo('seed failed')
    click.echo(e)
  else:
    click.echo('seed successful')
    return 'seed successful'

@app.route('/Rocket/', methods=['GET'], strict_slashes=False)
@app.route('/Rocket/<path:subpath>', methods=['GET'], strict_slashes=False)
def get_node(subpath=None):
  try:
    """Get Node."""

    id = "Rocket"
    ancestors = []
    parent = None
    
    # Determine query
    if subpath:
      # query using the subpath after the root: /Rocket/
      path = subpath.split("/")
      path.insert(0, id) #Add Root node to path
      id, ancestors, parent = ApiHelper.get_node_ancestry(path)
      if parent is None:
        parent = "Rocket"
    
    query = {
      "id": id, 
      "ancestors": ancestors, 
      "parent": parent,
    }
    # print("Query: ", query)

    documents = Database.load_from_db(query)
    json_resp = {}
    for doc in documents:
      json_resp[doc["id"]] = resolve_node(doc)

    # print(json_resp)
    return jsonify(json_resp)

  except Exception as e: 
    # NOTE: Would add proper error handling with more time
    click.echo('get node failed')
    click.echo(e)

# Determines if: Node traversal or returns property
def resolve_node(document):
  json_resp = {}
  if "is_node" in document and document["is_node"]:
    # Return the node
    json_resp = retrieve_sub_tree(document)
  else:
    # Return the property
    json_resp = document["property"]
  return json_resp

# Retrieves sub_tree from node
def retrieve_sub_tree(document):
  json_resp = {}
  query = {"parent": document["id"]}
  documents = Database.load_from_db(query)
  for doc in documents:
    json_resp[doc["id"]] = resolve_node(doc)
  return json_resp

