export const users = {
  admin:   { id: 0, name: 'Brian',   roles: ['admin', 'user'] },
  guest:   { id: 1, name: 'Emily',   roles: ['guest'] },
  pro:     { id: 2, name: 'Antonio', roles: ['pro'] }
}


// Define yor own checkers
const isAuthor = (user, { entity }) => {
  return user.id === entity.author.id
}

export const rules = [
  { role: 'guest',      target: 'article',    permissions: [['--r---'], ['cwrdlx', isAuthor]]  },
  { role: 'pro',        target: 'article',    permissions: [['c-r-l-']]                        },
]

export const targets = [
  'article',
  'article.title',
  'article.body'
]