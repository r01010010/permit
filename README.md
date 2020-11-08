#  sceptik

Very simple yet powerful tool for `role` 👩‍💻 and `attribute` 👀 based permission checking.

### Example

```js
const emily = getPerms({roles: ['guest']}, 'article')

if (emily.canCreate) {
  // ...
}
```

Another example taste 🍬

```js
const user = { roles: ['guest'] }
const { canCreate } = getPerms(user, 'article')

if (canCreate) {
  // ...
}
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

## Usage

Must provide an array of rules as the permission matrix to initialize the tool.

### Initialization.

```js
import initPerms from 'sceptik'

const rules = [
  { role: 'guest', target: 'article',         perms: 'r'      },
  { role: 'pro',   target: 'article',         perms: 'cwrl'   }
] 

const { getPermsAsActions } = initPerms({
  rules
})
```

For fine graining your entities or model access just add paths as properties. 

Example:

```js
const rules = [
  { role: 'guest',   target: 'article.body',         perms: ''   }
]

// User with a 'guest' role can't even read the body of an article.
```


### Check the permissions.

```js
const emily = getPerms({roles: ['guest']}, 'article')

console.log(
  emily.perms,        // ['l']
  emily.canEdit,      // false
  emily.canCreate,    // false
  emily.canEdit,      // false
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
```

## ROADMAP

- Add React Hook `usePerms`
- Add `entity` checking (ownsership)
- Make it extensible (add and interpret checker functions in rule matrix)
- Make permission types extensible (add more than just `cwrdlx`
- Add async initialization (permission matrix may come from the backend)
- Add async dynamic checking of rules

### The MIT License (MIT)

Copyright © 2020 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
