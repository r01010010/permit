
/**
 *  Very simple yet powerful API for permission management and checking.
 * 
 *  c: create
 *  w: write/edit
 *  r: read
 *  d: delete
 *  l: list
 *  x: execute
 */

import fp from 'lodash/fp'

const ALL_PERMS = 'cwrdlx' 
const ADMIN = 'admin'
const ERR_MSG_USER_PARAM = 'Provide a correct user param. Ex: user = { roles: [\'guest\'] }'

export default ({ rules }) => {
  const getRules = (roles, target) => rules.filter(
    rule => roles.includes(rule.role) && rule.target === target
  )
  
  const getPermsArray = (user, target) => {
    if (user && !user.roles) 
      throw new Error(ERR_MSG_USER_PARAM)

    const { roles } = user || { roles: [] }

    if (roles.includes(ADMIN)) 
      return ALL_PERMS
    
    return fp.pipe(
      fp.map(r => r.permissions.split('')),
      fp.flatten,
      fp.uniq
    )(getRules(roles, target))
  }

  const getPerms = (user, target) => {
    if (user && !user.roles) 
      throw new Error(ERR_MSG_USER_PARAM)

    const perms = getPermsArray(user, target)

    const canCreate =  !perms  || perms.includes('c')
    const canEdit =    !perms  || perms.includes('w')
    const canRead =    !perms  || perms.includes('r')
    const canDelete =  !perms  || perms.includes('d')
    const canList =    !perms  || perms.includes('l')
    const canExecute = !perms  || perms.includes('x')

    const canOnlyRead = canRead && !canEdit

    return {
      perms,

      canCreate,
      canEdit,
      canRead,
      canDelete,
      canList,
      canOnlyRead,
      canExecute,

      cannotCreate: !canCreate,
      cannotEdit: !canEdit,
      cannotRead: !canRead,
      cannotDelete: !canDelete,
      cannotList: !canList,
      cannotExecute: !canExecute,
    };
  };

  return {
    getRules,
    getPermsArray,
    getPerms
  }
}