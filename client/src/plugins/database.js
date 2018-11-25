import Vue from 'vue'
import Dexie from 'dexie'

Vue.prototype.$db = new Dexie('MySnookerSkills')

Vue.prototype.$db.version(1).stores({
  matches: '++id,players,teams,referee,winner,startDateTime,endDateTime,bestOf,reds,scores,handicaps,scoreboardType,statistics,status,createdOn,updatedOn',
  friends: 'id,firstName,lastName,username,profilePicture'
})
