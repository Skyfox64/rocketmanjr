# coding=utf-8

import click
import json

from flask import Flask, jsonify, request
from flask_cors import CORS
from database import Database

# from .entities.entity import Session, engine, Base
# from .entities.exam import Exam, ExamSchema

# creating the Flask application
app = Flask(__name__)
CORS(app) # Cross-Origin Resource Sharing

# Database Credentials and Connection 
# It would be better to store in a secure configuration management system.
# Tie our application to the MongoDB Instance
password = "MzpaSczwcOYRXjan"
connectionString = f'mongodb+srv://dbUser:{password}@cluster0.rx0dh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
app.config["MONGO_URI"] = connectionString
Database.initialize(app)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
  app.run(debug=True)

@app.cli.command()
def initdb():
  """Initialize the database."""
  click.echo('Init the db')
  # Loading or Opening the json file
  with open('database_seed.json') as file:
    file_data = json.load(file)
  Database.refresh_db() # wipe the collection
  Database.seed_db(file_data) # seed the collection as desired

#All the routings in our app will be mentioned here.
@app.route('/test')
def test():
  return "This Flask App is running"

# @app.route('/exams')
# def get_exams():
#     # fetching from the database
#     session = Session()
#     exam_objects = session.query(Exam).all()

#     # transforming into JSON-serializable objects
#     schema = ExamSchema(many=True)
#     exams = schema.dump(exam_objects)

#     # serializing as JSON
#     session.close()
#     return jsonify(exams.data)


# @app.route('/exams', methods=['POST'])
# def add_exam():
#     # mount exam object
#     posted_exam = ExamSchema(only=('title', 'description'))\
#         .load(request.get_json())

#     exam = Exam(**posted_exam.data, created_by="HTTP post request")

#     # persist exam
#     session = Session()
#     session.add(exam)
#     session.commit()

#     # return created exam
#     new_exam = ExamSchema().dump(exam).data
#     session.close()
#     return jsonify(new_exam), 201