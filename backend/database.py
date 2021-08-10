import datetime as dt
from pymongo import MongoClient

class Database:
  @classmethod
  def initialize(cls):
    # Database Credentials and Connection 
    password = "MzpaSczwcOYRXjan" # It would be better to store in a secure configuration management system.
    connectionString = f'mongodb+srv://dbUser:{password}@cluster0.rx0dh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    mongodb_client = MongoClient(connectionString)
    cls.database = mongodb_client.db

  @classmethod
  def refresh_db(cls):
    cls.database.rockets.drop()

  @classmethod
  def seed_db_directly(cls, data):
    # Inserting the loaded data in the Collection
    # if JSON contains data more than one entry
    # insert_many is used else insert_one is used
    if isinstance(data, list):
      cls.database.rockets.insert_many(data)
    else:
      cls.database.rockets.insert_one(data)

  @classmethod
  def seed_db(cls, data):
    for path, node in cls.traverse(data):
      id = path[-1]
      ancestors = path[:-1]
      parent = None
      if ancestors:
        parent = ancestors[-1]

      created_time = dt.datetime.now()
      iso_created_time = created_time.isoformat()

      # print(path, node)
      # print("id:", id)
      # print("ancestors:", ancestors)
      # print("parent:", parent)
      # print("created_at:", iso_created_time)

      document = {
        "id": id, 
        "ancestors": ancestors, 
        "parent": parent,
        "created_at": iso_created_time, 
        "node": node
      }

      cls.save_to_db(document)

  @classmethod
  def traverse(self, dict_or_list, path=[]):
    if isinstance(dict_or_list, dict):
      iterator = dict_or_list.items()
    else:
      iterator = enumerate(dict_or_list)
    for k, v in iterator:
      yield path + [k], v
      if isinstance(v, (dict, list)):
        for k, v in self.traverse(v, path + [k]):
          yield k, v

  @classmethod
  def save_to_db(cls, data):
    cls.database.rockets.insert_one(data)

  @classmethod
  def load_from_db(cls, query):
    return cls.database.rockets.find(query)

  @classmethod
  def load_node_from_db(cls, query):
    return cls.database.rockets.find_one(query)