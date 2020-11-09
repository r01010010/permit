#  sceptik

Very simple yet powerful tool for `role` 👩‍💻 and `attribute` 👀 based permission checking. Includes support for your own dynamic checkers.

### Example

```js
import initSceptik from 'sceptik'

// Define yor own checkers
const isAuthor = (user, { entity }) => {
  return user.id === entity.author.id
}

// Create your rule matrix
// Sceptik uses initials as in unix `cwrdlx`
export const rules = [
  { role: 'guest',      target: 'article',    permissions: [['--r---'], ['cwrdlx', isAuthor]]  },
  { role: 'pro',        target: 'article',    permissions: [['c-r-l-']]                        },
]

//
const { getPerms } = initSceptik({
  rules
})

// EXAMPLE 1: 🍪

const emily = getPerms({ roles: ['guest'] }, 'article')

console.log(
  emily.perms,        // ['r']
  emily.canEdit,      // false
  emily.canCreate,    // false
  emily.canRead,      // true
  emily.canDelete,    // false
  emily.canList,      // false
  emily.canOnlyRead,  // true
  emily.canExecute,   // false
  emily.cannotCreate, // true 
  emily.cannotEdit,   // true
  emily.cannotRead,   // false
  emily.cannotDelete, // true
  emily.cannotList,   // true
  emily.cannotExecute // true
)


// EXAMPLE 2: 🍬

const user = { roles: ['guest'] }
const { canCreate } = getPerms(user, 'article')

console.log(canCreate) // false


// EXAMPLE 3 (Dynamic check on entity): 🍫

const user = { id: 1, roles: ['guest'] }
const article = { author: user }

const { perms } = getPerms(user, 'article', { entity: article })

console.log(perms) // ['c', 'w', 'r', 'd', 'l', 'x']


```

### Available permissions

Every permission is identified as in `unix`. The list is extended by some more.

 - `c`: create
 - `w`: write/edit
 - `r`: read
 - `d`: delete
 - `l`: list
 - `x`: execute

`getPerms` though, return not only the list of the permissions but a list of syntactical `bools` to improve readability when using the api:

- `canCreate`
- `canEdit`
- `canRead`
- `canDelete`
- `canList`
- `canOnlyRead`
- `canExecute` 
- `cannotCreate`
- `cannotEdit`
- `cannotRead`
- `cannotDelete`
- `cannotList`
- `cannotExecute`

**NOTE:** Role `admin` has always all `cwrdlx`


## Roadmap

- [x] Add `entity` checking (ownsership)
- [x] Make it extensible (add and interpret checker functions in rule matrix)
- [ ] Add React Hook `usePerms`
- [ ] Make permission types extensible (add more than just `cwrdlx`
- [ ] Add async initialization (permission matrix may come from the backend)
- [ ] Add async dynamic checking of rules

<br>

### The MIT License (MIT)

Copyright © 2020 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
