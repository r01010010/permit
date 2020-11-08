export const users = {
  admin:   { name: 'Brian',   roles: ['admin', 'user'] },
  guest:   { name: 'Emily',   roles: ['guest'] },
  pro:     { name: 'Antonio', roles: ['pro'] }
}

export const rules = [
  { role: 'guest',      target: 'article',                  permissions: 'r'      },
  { role: 'pro',        target: 'article',                  permissions: 'crl'    },
]

export const targets = [
  'article',
  'article.title',
  'article.body'
]