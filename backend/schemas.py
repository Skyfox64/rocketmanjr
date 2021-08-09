import uuid
import datetime as dt
from models import *
from marshmallow import Schema, fields, post_load

class EngineSchema(Schema):
  _id = fields.UUID(missing=uuid.uuid1)
  created_at = fields.DateTime()
  name = fields.Str(data_key="Name")
  thrust = fields.Number(data_key="Thrust")
  isp = fields.Number(data_key="ISP")

  @post_load
  def make_engine(self, data, **kwargs):
    return Engine(**data)

class StageSchema(Schema):
  _id = fields.UUID(missing=uuid.uuid1)
  created_at = fields.DateTime()
  name = fields.Str(data_key="Name")
  engines = fields.Nested(EngineSchema, data_key="Engines", many=True)

  @post_load
  def make_stage(self, data, **kwargs):
    return Stage(**data)

class RocketSchema(Schema):
  _id = fields.UUID(missing=uuid.uuid1)
  created_at = fields.DateTime()
  name = fields.Str(data_key="Name")
  height = fields.Number(data_key="Height")
  mass = fields.Number(data_key="Mass")
  stages = fields.Nested(StageSchema, data_key="Stages", many=True)

  @post_load
  def make_rocket(self, data, **kwargs):
    return Rocket(**data)

class RootSchema(Schema):
  _id = fields.UUID(missing=uuid.uuid1)
  created_at = fields.DateTime()
  # rockets = fields.Nested(RocketSchema, data_key="Rockets", many=True)
  rocket = fields.Nested(RocketSchema, data_key="Rocket", many=False)

  @post_load
  def make_root(self, data, **kwargs):
    return Root(**data)

class UserSchema(Schema):
  name = fields.Str()
  email = fields.Email()
  created_at = fields.DateTime()

  @post_load
  def make_user(self, data, **kwargs):
    return User(**data)