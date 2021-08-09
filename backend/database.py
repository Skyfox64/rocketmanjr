from flask_pymongo import PyMongo

class Database:
  @classmethod
  def initialize(cls, app):
    mongodb_client = PyMongo(app)
    cls.database = mongodb_client.db

  @classmethod
  def refresh_db(cls):
    cls.database.rockets.drop()

  @classmethod
  def seed_db(cls, data):
    # Inserting the loaded data in the Collection
    # if JSON contains data more than one entry
    # insert_many is used else insert_one is used
    if isinstance(data, list):
      cls.database.rockets.insert_many(data)
    else:
      cls.database.rockets.insert_one(data)

  @classmethod
  def save_to_db(cls, data):
    cls.database.rockets.insert_one(data)


  @classmethod
  def load_from_db(cls, query):
    return cls.database.rockets.find(query)