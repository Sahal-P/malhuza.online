db = db.getSiblingDB('content')


db.createUser({
    user: 'sahal',
    pwd: '09876',
    roles: [
      {
        role: 'dbOwner',
      db: 'content',
    },
  ],
});