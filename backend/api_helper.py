
class ApiHelper:
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
  def get_node_ancestry(cls, path):
    id = path[-1]
    ancestors = path[:-1]
    parent = None
    if ancestors:
      parent = ancestors[-1]
    return id, ancestors, parent