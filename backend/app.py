# coding=utf-8

import click
import json
import datetime as dt
from pprint import pprint 
from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import json_util
from api_helper import ApiHelper
from database import Database

# Creating the Flask application
app = Flask(__name__)
CORS(app) # Allow Cross-Origin Resource Sharing (CORS)
# NOTE: During the development process, this configuration will be enough. 
# However, in the future, you will probably want to be more restrictive
# Reference: https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-apps-part-1/

# Tie our application to the MongoDB Instance
Database.initialize()

# Run
if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)

#"flask initdb" in CLI to wipe and then seed the database.
@app.cli.command()
@click.option('--verbose', '-v', is_flag=True, help="Print more output.")
def initdb(verbose):
  try:
    """Initialize the database."""
    click.echo('Initializing the db')

    # Could extend this method a parameter for file path
    # Loading or Opening the json file
    with open('database_seed.json') as file:
      file_data = json.load(file)

    Database.wipe_db() # wipe the collection
    Database.seed_db(file_data, verbose) # seed the collection as desired
    Database.create_db_index("ancestors") #index off of 'ancestors' to boost performance
    Database.create_db_index("parent") #index off of 'parent' to boost performance
  except:
    click.echo('db seed failed')
  else:
    click.echo('db seed successful')

#"flask wipedb" in CLI to wipe the databse
@app.cli.command()
def wipedb():
  try:
    """Wipe the database."""
    click.echo('Wiping the db')
    Database.wipe_db() # wipe the collection
  except:
    click.echo('db wipe failed')
  else:
    click.echo('db wipe successful')

#All the routings in our app will be mentioned below.
@app.route('/test')
def test():
  return "This App is running", 200

@app.route('/seed', methods=['GET'])
def seed():
  try:
    """Seed DB."""
    with open('./backend/database_seed.json') as file:
      file_data = json.load(file)

    Database.wipe_db() # wipe the collection
    Database.seed_db(file_data, True) # seed the collection as desired
    Database.create_db_index("ancestors")
    # Database.create_db_index("parent")
    
  except Exception as e: 
    click.echo('seed failed')
    click.echo(e)
  else:
    click.echo('seed successful')
    return 'seed successful', 200

@app.route('/Rocket/', methods=['GET'], strict_slashes=False)
@app.route('/Rocket/<path:subpath>', methods=['GET'], strict_slashes=False)
def get_node(subpath=None):
  try:
    """Get Node."""

    # Return the created time of a node/property 
    # (i.e. /Rocket/Stage2?timestamp=true)
    with_timestamp = request.args.get("timestamp", default=False, type=bool)

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

    document = Database.load_one_from_db(query)
    json_resp = {}
    if document:
      json_resp[document["id"]] = resolve_document(document, with_timestamp)

    if json_resp:
      # jsonify applies the appropriate mimetype through it's response
      return jsonify(json_resp), 200
    else:
      csv_path = "/".join(path)
      return f"No node or property found at path: {csv_path}", 404

  except Exception as e: 
    click.echo('get node failed')
    click.echo(e)

@app.route('/Rocket/', methods=['POST'], strict_slashes=False)
@app.route('/Rocket/<path:subpath>', methods=['POST'], strict_slashes=False)
def create_node_or_property(subpath=None):
  try:
    """Create Node or Property."""

    id = "Rocket"
    ancestors = []
    parent = None
    
    # Determine query
    if subpath:
      # query using the subpath after the root: /Rocket/
      path = subpath.split("/")
      path.insert(0, id) #Add Root node "Rocket" to path
      csv_path = "/".join(path)
      id, ancestors, parent = ApiHelper.get_node_ancestry(path)
      if parent is None:
        parent = "Rocket"
    
    query = {
      "id": id, 
      "ancestors": ancestors, 
      "parent": parent,
    }

    # check if document exists
    document = Database.load_one_from_db(query)
    if document:
      if request.data:
        # if there's a request body, add property to existing node
        # Create new property
        return create_property(path, request)
      else:
        return f"Node exists at path: {csv_path}\nMissing JSON body.", 400

    else:
      # Create new node
      return create_node(path, query)

  except Exception as e: 
    # NOTE: Would add proper error handling with more time
    click.echo('create node failed')
    click.echo(e)

# Create new property
def create_property(path, request):
  # Validate if it is a single k, v pair
  _property = request.get_json()
  pairs = _property.items()

  # Limit to one property at a time
  if len(pairs) > 1:
    return """
              Unable to process content.\n
              Limit to one property at a time.\n
              Example: { \"foo\": 20.2 }
            """, 422

  pairs_iterator = iter(pairs)
  first_pair = next(pairs_iterator)
  id, ancestors, parent = ApiHelper.get_node_ancestry(path + [first_pair[0]])
  
  # Build Document for the new property
  document = {
    "id": id, 
    "ancestors": ancestors, 
    "parent": parent,
    "created_at": dt.datetime.now().isoformat(),
    "is_node": False,
    "property": first_pair[1]
  }

  result = Database.save_to_db(document)
  if result.inserted_id:
    # If successful, return the newly created property document
    document = Database.load_one_from_db({"_id": result.inserted_id})
    json_resp = {}
    json_resp[document["id"]] = resolve_document(document)
    return jsonify(json_resp), 200
  else:
    csv_path = "/".join(ancestors) + "/" + first_pair[0]
    return f"Error creating new node at path: {csv_path}", 500

# Create new node
def create_node(path, query):
  document = query
  document["created_at"] = dt.datetime.now().isoformat()
  document["is_node"] = True

  result = Database.save_to_db(document)
  if result.inserted_id:
    return jsonify({}), 200
  else:
    csv_path = "/".join(path)
    return f"Error creating new node at path: {csv_path}", 500

# Determines if document is a Node a Property and returns
def resolve_document(document, with_timestamp):
  json_resp = {}

  if "is_node" in document and document["is_node"]:
    # Return the node
    if with_timestamp:
      json_resp["subtree"] = retrieve_sub_tree(document, with_timestamp)
      json_resp["created_at"] = document["created_at"]
    else:
      json_resp = retrieve_sub_tree(document, with_timestamp)
  else:
    # Return the property
    if with_timestamp:
      json_resp["value"] = document["property"] # Value of the property
      json_resp["created_at"] = document["created_at"] # Time item created
    else:
      json_resp = document["property"]

  return json_resp

# Retrieves sub_tree from node
def retrieve_sub_tree(node, with_timestamp):
  json_resp = {}
  query = {"parent": node["id"]}
  documents = Database.load_from_db(query)
  for doc in documents:
    json_resp[doc["id"]] = resolve_document(doc, with_timestamp)
  return json_resp

