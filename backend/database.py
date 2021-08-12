import datetime as dt
from pymongo import MongoClient
from pymongo.collection import ReturnDocument
from api_helper import ApiHelper

class Database:
  @classmethod
  def initialize(cls):
    # Database Credentials and Connection 
    # It would be better to store this in a secure configuration management system.
    password = "MzpaSczwcOYRXjan" 
    connectionString = f'mongodb+srv://dbUser:{password}@cluster0.rx0dh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    mongodb_client = MongoClient(connectionString)
    cls.database = mongodb_client.db

  @classmethod
  def wipe_db(cls):
    cls.database.rockets.drop()

  @classmethod
  def seed_db_directly(cls, data):
    # Inserting the loaded data in the 'Rockets' Collection
    # if JSON data contains more than one entry, insert_many is used 
    # else insert_one is used
    if isinstance(data, list):
      cls.database.rockets.insert_many(data)
    else:
      cls.database.rockets.insert_one(data)

  @classmethod
  def seed_db(cls, data, verbose):
    for path, node in ApiHelper.traverse(data):
      id, ancestors, parent = ApiHelper.get_node_ancestry(path)

      document = {
        "id": id, 
        "ancestors": ancestors, 
        "parent": parent,
        "created_at": dt.datetime.now().isoformat()
      }

      # Add node's value if it is not a dict object
      if type(node) is not dict:
        document["is_node"] = False
        document["property"] = node
      else:
        document["is_node"] = True

      if verbose:
        print("Document:", document)
      cls.save_to_db(document)

  @classmethod
  def create_db_index(cls, index):
    cls.database.rockets.create_index([(index, -1)])

  @classmethod
  def save_to_db(cls, data):
    return cls.database.rockets.insert_one(data)

  @classmethod
  def update_in_db(cls, query, data):
    # return cls.database.rockets.find_one_and_update(data)
    return cls.database.rockets.find_one_and_update(
                            query,
                            { '$set': data }, 
                            return_document = ReturnDocument.AFTER)

  @classmethod
  def load_from_db(cls, query):
    return cls.database.rockets.find(query)

  @classmethod
  def load_one_from_db(cls, query):
    return cls.database.rockets.find_one(query)