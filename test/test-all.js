/* eslint-disable no-undef */
import { assert, expect } from 'chai'
import { users, rules } from './data.js'
import initPerms from '../src/index.js'

const { admin, guest, pro } = users
const { getPerms } = initPerms({
  rules
})

describe('Permit', () => {
  describe('🤷‍♀️ Guest', () => {
    it('Guest can READ article', () => {
      assert.isTrue(getPerms(guest, 'article').canRead)
    })
    it('Guest can only read article', () => {
      assert.isTrue(getPerms(guest, 'article').canOnlyRead)
    })
    it('Guest cannot list articles', () => {
      assert.isFalse(getPerms(guest, 'article').canList)
    })
    it('Guest cannot create article', () => {
      assert.isFalse(getPerms(guest, 'article').canCreate)
    })
    it('Guest cannot edit article', () => {
      assert.isFalse(getPerms(guest, 'article').canEdit)
    })
    it('Guest cannot delete article', () => {
      assert.isFalse(getPerms(guest, 'article').canDelete)
    })
  })

  describe('💻  Pro', () => {
    it('Pro can READ article', () => {
      assert.isTrue(getPerms(pro, 'article').canRead)
    })
    it('Pro can only read article', () => {
      assert.isTrue(getPerms(pro, 'article').canOnlyRead)
    })
    it('Pro can list articles', () => {
      assert.isTrue(getPerms(pro, 'article').canList)
    })
    it('Pro can create article', () => {
      assert.isTrue(getPerms(pro, 'article').canCreate)
    })
    it('Pro cannot edit article', () => {
      assert.isFalse(getPerms(pro, 'article').canEdit)
    })
    it('Pro cannot delete article', () => {
      assert.isFalse(getPerms(pro, 'article').canDelete)
    })
  })

  describe('💼  Admin', () => {
    it('Admin can READ article', () => {
      assert.isTrue(getPerms(admin, 'article').canRead)
    })
    it('Admin cannot only read article', () => {
      assert.isFalse(getPerms(admin, 'article').canOnlyRead)
    })
    it('Admin can list articles', () => {
      assert.isTrue(getPerms(admin, 'article').canList)
    })
    it('Admin can create article', () => {
      assert.isTrue(getPerms(admin, 'article').canCreate)
    })
    it('Admin can edit article', () => {
      assert.isTrue(getPerms(admin, 'article').canEdit)
    })
    it('Admin can delete article', () => {
      assert.isTrue(getPerms(admin, 'article').canDelete)
    })
  })

  describe('📡  Various', () => {
    
    it('Doesn\'t crash when no params', () => {
      getPerms()
      return true
    })

    it('Doesn\'t crash when user but not target', () => {
      getPerms(guest)
      return true
    })

    it('Returns empty array when no params to getPerms()', () => {
      assert.lengthOf(getPerms().perms, 0)
    })

    it('Returns empty array when no target to getPerms(user)', () => {
      assert.lengthOf(getPerms(guest).perms, 0)
    })

    it('Throws error if user is not an object in getPerms(user)', () => {
      expect(() => getPerms(9, 0)).throw(Error)
    })

    it('Throws error if user is not an object in getPermsArray(user)', () => {
      expect(() => getPerms(9, 0)).throw(Error)
    })
  })
})