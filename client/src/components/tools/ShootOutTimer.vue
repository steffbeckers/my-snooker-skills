<template>
  <v-container grid-list-lg fluid>
    <v-layout fill-height column>
      <v-flex v-if="matchStartedAt" class="display-4 text-xs-center" xs12>
        <div v-if="shotTimeLeft">
          {{ shotTimeLeft }}
        </div>
        <div v-else style="color: #eee;">
          00:00
        </div>
      </v-flex>
      <v-flex v-if="matchStartedAt" xs12>
        <v-btn v-if="!timerStarted" @click="startTimer()" color="primary" block>
          Start Clock
        </v-btn>
        <v-btn v-if="timerStarted" @click="stopTimer()" color="primary" block>
          Stop Clock
        </v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex class="display-4 text-xs-center" xs12 shrink>
        <div v-if="matchStartedAt">
          {{ matchTimeLeft }}
        </div>
        <div v-else xs12>
          {{ matchMinutes }}:00
        </div>
      </v-flex>
      <v-flex xs12>
        <v-btn v-if="!matchStartedAt" @click="startMatch()" color="primary" block>
          Start match
        </v-btn>
        <v-btn v-else @click="endMatch()" block>
          End match
        </v-btn>
      </v-flex>
    </v-layout>
    <div fill-height></div>
    <v-layout row>
      <v-flex xs2>
        <v-text-field type="number" label="Match minutes" v-model.number="matchMinutes" dense></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-text-field type="number" label="Seconds per shot" v-model.number="secondsPerShot" dense></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-text-field type="number" label="Seconds per shot after half" v-model.number="fasterSecondsPerShot" dense></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
#app main.v-content {
  padding-top: 0px !important;
  margin-bottom: 0px !important;
}

.display-4 {
  font-size: 20em !important;
}
</style>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      interval: null,
      // Players
      // player1: '',
      // player2: '',
      // Match
      matchMinutes: parseInt(localStorage.getItem('MSS:tools:shoot-out-timer:matchMinutes')) || 10,
      matchStartedAt: null,
      matchEndAt: null,
      // Shot
      secondsPerShot: parseInt(localStorage.getItem('MSS:tools:shoot-out-timer:secondsPerShot')) || 15,
      fasterSecondsPerShot: parseInt(localStorage.getItem('MSS:tools:shoot-out-timer:fasterSecondsPerShot')) || 10,
      timerStartedAt: null,
      timerEndAt: null,
      timerStarted: false
    }
  },
  computed: {
    matchTimeLeft() {
      if (!this.matchEndAt) { return null }
      let diff = moment(moment()).diff(this.matchEndAt) * -1

      if (diff > 0) {
        return moment.utc(diff).format('mm:ss')
      } else if (diff < -4500) {
        this.endMatch()
      } else {
        return '-' + moment.utc(Math.abs(diff - 1000)).format('mm:ss')
      }
    },
    shotTimeLeft() {
      if (!this.timerEndAt) { return null }
      let diff = moment(moment()).diff(this.timerEndAt) * -1

      if (diff > 0) {
        return moment.utc(diff).format('mm:ss')
      } else if (diff < -4500) {
        this.stopTimer()
      } else {
        return '-' + moment .utc(Math.abs(diff - 1000)).format('mm:ss')
      }
    },
    timerStopped() {
      return !this.timerStarted
    }
  },
  mounted() {
    // Keyboard bind to start and stop shot timer
    window.addEventListener("keyup", (e) => {
      // Spacebar
      if (e.keyCode == 32 || e.which == 32) {
        e.preventDefault() 

        // Start match if not started yet
        if (!this.matchStartedAt) {
          this.startMatch()
          return
        }

        // Toggle shot timer
        this.toggleTimer()
      }
    })
  },
  methods: {
    trigger() {
      if (this.matchEndAt)
        this.matchEndAt = {...this.matchEndAt}
      if (this.timerEndAt)
        this.timerEndAt = {...this.timerEndAt}
    },
    startMatch() {
      this.interval = setInterval(this.trigger, 50)

      // Started at
      this.matchStartedAt = moment()
      this.matchEndAt = this.matchStartedAt.add(this.matchMinutes, 'minute')
    },
    endMatch() {
      this.stopTimer()
      this.matchStartedAt = null
      this.matchEndAt = null

      this.reset();
    },
    startTimer() {
      // Only start timer if match already started
      if (this.matchEndAt) {
        // Started at
        this.timerStartedAt = moment()

        // Over half time = Faster shot time
        let diff = moment(this.timerStartedAt).diff(this.matchEndAt) * -1
        if ((diff / 1000) < (this.matchMinutes * 60 / 2)) {
          this.timerEndAt = this.timerStartedAt.add(this.fasterSecondsPerShot + 1, 'second')
        } else {
          this.timerEndAt = this.timerStartedAt.add(this.secondsPerShot + 1, 'second')
        }
        
        this.timerStarted = true
      }
    },
    stopTimer() {
      this.timerStartedAt = null
      this.timerEndAt = null

      this.timerStarted = false
    },
    toggleTimer() {
      if (!this.timerStarted) {
        this.startTimer()
      } else {
        this.stopTimer()
      }
    },
    reset() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    }
  },
  watch: {
    matchMinutes: (matchMinutes) => {
      localStorage.setItem('MSS:tools:shoot-out-timer:matchMinutes', matchMinutes)
    },
    secondsPerShot: (secondsPerShot) => {
      localStorage.setItem('MSS:tools:shoot-out-timer:secondsPerShot', secondsPerShot)
    },
    fasterSecondsPerShot: (fasterSecondsPerShot) => {
      localStorage.setItem('MSS:tools:shoot-out-timer:fasterSecondsPerShot', fasterSecondsPerShot)
    }
  },
  name: "ShootOutTimer"
};
</script>
