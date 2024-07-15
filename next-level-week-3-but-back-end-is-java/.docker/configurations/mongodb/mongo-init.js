db = db.getSiblingDB('happy');
db.createUser(
  {
    user: 'root',
    pwd: 'root',
    roles: [{ role: 'readWrite', db: 'happy' }],
  },
);