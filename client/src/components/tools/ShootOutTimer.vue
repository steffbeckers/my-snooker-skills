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
  </v-container>
</template>

<style>
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
      player1: '',
      player2: '',
      // Match
      matchMinutes: 10,
      matchStartedAt: null,
      matchEndAt: null,
      // Shot
      secondsPerShot: 15,
      timerStartedAt: null,
      timerEndAt: null,
      timerStarted: false
    }
  },
  computed: {
    matchTimeLeft() {
      if (!this.matchEndAt) { return null }
      let diff = moment(moment()).diff(this.matchEndAt) * -1

      return moment.utc(diff).format('mm:ss')
    },
    shotTimeLeft() {
      if (!this.timerEndAt) { return null }
      let diff = moment(moment()).diff(this.timerEndAt) * -1

      return moment.utc(diff).format('mm:ss')
    },
    timerStopped() {
      return !this.timerStarted
    }
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
      // Started at
      this.timerStartedAt = moment()
      this.timerEndAt = this.timerStartedAt.add(this.secondsPerShot + 1, 'second')

      this.timerStarted = true
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
  name: "ShootOutTimer"
};
</script>
