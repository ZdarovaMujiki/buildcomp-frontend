
class Obj {
  name = "";
  client = "";
  sector = new Sector();
}

class Brigade {
  name = "";
}

class Work {
  name = "";
  object = new Obj();
  brigade = new Brigade();
  plannedStart = new Date();
  plannedFinish = new Date();
  realStart = new Date();
  realFinish = new Date();
}

class Error {
  error = "";
}

class Management {
  name = "";
}

class Sector {
  name = "";
  management = new Management();
}

class Personnel {
  name = "";
  duty = "";
  sector = new Sector();
}

class Resource {
  name = "";
  measure = "";
}

class Tech {
  name = "";
  management = new Management();
}

export function getType(typeString: string) {
  switch (typeString) {
    case 'management': return new Management()
    case 'work': return new Work()
    case 'sector': return new Sector()
    case 'personnel': return new Personnel()
    case 'brigade': return new Brigade()
    case 'object': return new Obj()
    case 'resource': return new Resource()
    case 'tech': return new Tech()
    default: return new Error()
  }
}