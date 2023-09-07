import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Stoyann Velten',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'User 1',
    email: 'john@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'User 2',
    email: 'jane@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users
