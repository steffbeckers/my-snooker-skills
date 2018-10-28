import Vue from 'vue'
import Dexie from 'dexie'

Vue.prototype.$db = new Dexie('MySnookerSkills')

Vue.prototype.$db.version(1).stores({
  matches: '++id,players,teams,referee,winner,startDateTime,endDateTime,bestOf,reds,scores,handicaps,scoreboardType,statistics,createdOn,updatedOn'
})
