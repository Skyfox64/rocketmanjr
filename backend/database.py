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