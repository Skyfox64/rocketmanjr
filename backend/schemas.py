from marshmallow import Schema, fields

class RocketSchema(Schema):
    created_at = fields.DateTime(required=True)
    name = fields.Str(required=True)
    height = fields.Str()
    mass = fields.Number()
    stages = []

class StageSchema(Schema):
    created_at = fields.DateTime(required=True)
    name = fields.Str(required=True)
    engines = []

class EngineSchema(Schema):
    created_at = fields.DateTime(required=True)
    name = fields.Str(required=True)
    thrust = fields.Number()
    isp = fields.Number()