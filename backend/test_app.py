import json
import pytest
from flask import current_app, request

from app import app
# Referenced: https://flask.palletsprojects.com/en/2.0.x/testing/

@pytest.fixture
def client():
  app.config['TESTING'] = True
  with app.app_context():
      with app.test_client() as client:
          yield client

def test_running(client):
  response = client.get('/test')
  assert response.status_code == 200
  assert response.content_type == "text/html; charset=utf-8"
  assert b'This App is running' in response.data

def test_error(client):
  response = client.get('/Rocket/abcdefghijkl_test')
  assert response.status_code == 404
  assert response.content_type == "text/html; charset=utf-8"
  assert b'No node or property found at path: Rocket/abcdefghijkl_test' in response.data

def test_R_S1_E2_ISP_property(client):
  response = client.get('/Rocket/Stage1/Engine2/ISP')
  assert response.status_code == 200
  assert response.content_type == "application/json"

  data = json.loads(response.get_data(as_text=True))
  assert data['ISP'] == 11.632

def test_R_S2_node(client):
  response = client.get('/Rocket/Stage2')
  assert response.status_code == 200
  assert response.content_type == "application/json"

  data = json.loads(response.get_data(as_text=True))
  assert data == {
                   "Stage2": {
                      "Engine1": {
                        "ISP": 15.11, 
                        "Thrust": 1.622
                      }
                    }
                  }

def test_R_S2_node_with_trailing_slash(client):
  response = client.get('/Rocket/Stage2/')
  assert response.status_code == 200
  assert response.content_type == "application/json"

  data = json.loads(response.get_data(as_text=True))
  assert data == {
                   "Stage2": {
                      "Engine1": {
                        "ISP": 15.11, 
                        "Thrust": 1.622
                      }
                    }
                  }

def test_R_S1_E1_node(client):
  response = client.get('/Rocket/Stage1/Engine1')
  assert response.status_code == 200
  assert response.content_type == "application/json"

  data = json.loads(response.get_data(as_text=True))
  assert data == {
                    "Engine1": {
                      "ISP": 15.11, 
                      "Thrust": 1.622
                    }
                  }

def test_R_S1_E1_node_with_trailing_slash(client):
  response = client.get('/Rocket/Stage1/Engine1/')
  assert response.status_code == 200
  assert response.content_type == "application/json"

  data = json.loads(response.get_data(as_text=True))
  assert data == {
                    "Engine1": {
                      "ISP": 15.11, 
                      "Thrust": 1.622
                    }
                  }

def test_root_node(client):
  response = client.get('/Rocket')
  assert response.status_code == 200
  assert response.content_type == "application/json"

  data = json.loads(response.get_data(as_text=True))
  assert data == {
                    "Rocket": {
                      "Height": 18.0, 
                      "Mass": 12000.0, 
                      "Stage1": {
                        "Engine1": {
                          "ISP": 15.11, 
                          "Thrust": 1.622
                        }, 
                        "Engine2": {
                          "ISP": 11.632, 
                          "Thrust": 9.413
                        }, 
                        "Engine3": {
                          "ISP": 12.551, 
                          "Thrust": 9.899
                        }
                      }, 
                      "Stage2": {
                        "Engine1": {
                          "ISP": 15.11, 
                          "Thrust": 1.622
                        }
                      }
                    }
                  }

def test_root_node_with_trailing_slash(client):
  response = client.get('/Rocket/')
  assert response.status_code == 200
  assert response.content_type == "application/json"

  data = json.loads(response.get_data(as_text=True))
  assert data == {
                    "Rocket": {
                      "Height": 18.0, 
                      "Mass": 12000.0, 
                      "Stage1": {
                        "Engine1": {
                          "ISP": 15.11, 
                          "Thrust": 1.622
                        }, 
                        "Engine2": {
                          "ISP": 11.632, 
                          "Thrust": 9.413
                        }, 
                        "Engine3": {
                          "ISP": 12.551, 
                          "Thrust": 9.899
                        }
                      }, 
                      "Stage2": {
                        "Engine1": {
                          "ISP": 15.11, 
                          "Thrust": 1.622
                        }
                      }
                    }
                  }
