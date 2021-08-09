import datetime as dt

class Engine:
  def __init__(self, _id, name, thrust, isp):
    self.id= _id
    self.name = name
    self.created_at = dt.datetime.now().isoformat()
    self.thrust = thrust
    self.isp = isp

  # def __repr__(self):
  #   return "<Engine(name={self.name!r})>".format(self=self)

class Stage:
  def __init__(self, _id, name, engines):
    self.id= _id
    self.name = name
    self.created_at = dt.datetime.now().isoformat()
    self.engines = engines

  # def __repr__(self):
  #   return "<Stage(name={self.name!r})>".format(self=self)

class Rocket:
  def __init__(self, _id, name, height, mass, stages):
    self.id= _id
    self.name = name
    self.created_at = dt.datetime.now().isoformat()
    self.height = height
    self.mass = mass
    self.stages = stages

  # def __repr__(self):
  #   return "<Rocket(name={self.name!r})>".format(self=self)

class Root:
  def __init__(self, _id, rocket):
    self.id= _id
    self.created_at = dt.datetime.now().isoformat()
    self.rocket = rocket

  # def __repr__(self):
  #   return "<Root(name={self.name!r})>".format(self=self)

class User:
  def __init__(self, name, email):
    self.name = name
    self.email = email
    self.created_at = dt.datetime.now().isoformat()

  def __repr__(self):
    return "<User(name={self.name!r})>".format(self=self)

