<template>
  <div>
    <v-toolbar color="transparent" class="elevation-0">
      <v-toolbar-title><v-icon class="mr-2">drag_indicator</v-icon> Scoreboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="undo()" v-if="breaks.length > 0" icon><v-icon color="rgba(0,0,0,.54)">undo</v-icon></v-btn>
      <v-btn @click="reset()" icon><v-icon color="rgba(0,0,0,.54)">refresh</v-icon></v-btn>
      <v-btn :to="{ name: 'TrainingOverview' }" exact icon>
        <v-icon color="rgba(0,0,0,.54)">close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="pt-0" grid-list-lg fluid>
      <v-layout row>
        <v-flex xs12>
          <div v-if="currentBreak === ''" class="display-4 font-weight-light text-xs-center pr-1">
            {{ score }}
          </div>
          <div v-else class="display-4 text-xs-center pr-1" :class="lastInputAutoOKCounter % 15 === 0 ? 'font-weight-medium' : 'font-weight-light'">
            {{ currentBreak || 0 }}
          </div>
          <div class="text-xs-center">
            <span v-for="(b, index) in breaks" :key="b.dateTime">{{ b.value}}<span v-if="index !== breaks.length - 1">, </span></span>
          </div>
          <div class="numpad">
            <v-btn @click="inputNumber(1)" color="secondary" class="number-button elevation-0" large>1</v-btn>
            <v-btn @click="inputNumber(2)" color="secondary" class="number-button elevation-0" large>2</v-btn>
            <v-btn @click="inputNumber(3)" color="secondary" class="number-button elevation-0" large>3</v-btn>
            <v-btn @click="inputNumber(4)" color="secondary" class="number-button elevation-0" large>4</v-btn>
            <v-btn @click="inputNumber(5)" color="secondary" class="number-button elevation-0" large>5</v-btn>
            <v-btn @click="inputNumber(6)" color="secondary" class="number-button elevation-0" large>6</v-btn>
            <v-btn @click="inputNumber(7)" color="secondary" class="number-button elevation-0" large>7</v-btn>
            <v-btn @click="inputNumber(8)" color="secondary" class="number-button elevation-0" large>8</v-btn>
            <v-btn @click="inputNumber(9)" color="secondary" class="number-button elevation-0" large>9</v-btn>
            <v-btn @click="inputNumber('-')" :disabled="currentBreak !== ''" color="secondary" class="number-button elevation-0" large>-</v-btn>
            <v-btn @click="inputNumber(0)" :disabled="currentBreak === '' || currentBreak === '-'" color="secondary" class="number-button elevation-0" large>0</v-btn>
            <v-btn @click="currentBreak = ''; resetTimers()" :disabled="currentBreak === ''" color="secondary" class="number-button elevation-0" large>C</v-btn>
            <div style="grid-area: ok; width: 100%;">
              <v-progress-linear class="auto-ok-progress mb-0 mt-4" :color="currentBreak === '' || currentBreak === '-' ? 'secondary' : 'primary'" v-model="lastInputAutoOKCounter" height="5"></v-progress-linear>
              <v-btn @click="ok()" :disabled="currentBreak === '' || currentBreak === '-'" class="elevation-0 mt-0 ok-button" color="primary" block large>OK</v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.numpad {
  margin: 0 auto;
  margin-top: 20px;
  width: fit-content;
  display: grid;
  grid-template-columns: 80px 80px 80px;
  grid-template-rows: 75px 75px 75px 75px 100px;
  grid-template-areas: "num num num"
                       "num num num"
                       "num num num"
                       "num num num"
                       "ok ok ok";
  grid-column-gap: 18px;
  grid-row-gap: 10px;
  justify-items: center;
}
.number-button {
  height: 75px;
  border-radius: 0;
  font-size: 2em;
  margin: 0px;
  overflow: hidden;
}
.auto-ok-progress {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.ok-button {
  height: 75px;
  padding-bottom: 5px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>

<script>
import { setTimeout, clearTimeout, setInterval, clearInterval } from 'timers'

export default {
  data() {
    return {
      dateTime: localStorage.getItem('training:scoreboard:dateTime') || new Date().toISOString(),
      score: parseInt(localStorage.getItem('training:scoreboard:score')) || 0,
      currentBreak: localStorage.getItem('training:scoreboard:currentBreak') || '',
      breaks: JSON.parse(localStorage.getItem('training:scoreboard:breaks')) || [],
      lastInputAutoOK: null,
      lastInputAutoOKCounter: 0,
      lastInputAutoOKInterval: null,
    }
  },
  methods: {
    inputNumber(value) {
      // If minus, then the length can be 4, else 3 characters
      if (this.currentBreak.indexOf('-') !== -1) {
        if (this.currentBreak.length === 4) return
      } else {
        if (this.currentBreak.length === 3) return
      }

      this.resetTimers()

      this.currentBreak += value

      // Counter
      this.lastInputAutoOKInterval = setInterval(() => {
        if (this.lastInputAutoOKCounter <= 100) {
          this.lastInputAutoOKCounter += 10
        } else {
          this.resetTimers()
        }
      }, 270)

      // Automatically trigger OK 3 seconds after last input
      this.lastInputAutoOK = setTimeout(() => {
        this.ok()
      }, 3000)
    },
    ok() {
      this.resetTimers()

      this.score += parseInt(this.currentBreak)
      this.breaks.push({
        dateTime: new Date().toISOString(),
        value: parseInt(this.currentBreak)
      })
      this.currentBreak = ''
    },
    undo() {
      this.resetTimers()

      this.currentBreak = ''
      this.score -= this.breaks.pop().value
    },
    reset() {
      this.resetTimers()

      if (confirm('Are you sure you want to reset the scoreboard?')) {
        this.dateTime = new Date().toISOString()
        this.lastInputAutoOK = null
        this.lastInputAutoOKCounter = 0
        this.lastInputAutoOKInterval = null
        this.score = 0
        this.currentBreak = ''
        this.breaks = []
      }
    },
    resetTimers() {
      if (this.lastInputAutoOKInterval) {
        clearInterval(this.lastInputAutoOKInterval)
        this.lastInputAutoOKInterval = null
        this.lastInputAutoOKCounter = 0
      }
      if (this.lastInputAutoOK) {
        clearTimeout(this.lastInputAutoOK)
        this.lastInputAutoOK = null
      }
    },
  },
  watch: {
    dateTime(value) {
      localStorage.setItem('training:scoreboard:dateTime', value)
    },
    score(value) {
      localStorage.setItem('training:scoreboard:score', value)
    },
    currentBreak(value) {
      localStorage.setItem('training:scoreboard:currentBreak', value)
    },
    breaks(value) {
      localStorage.setItem('training:scoreboard:breaks', JSON.stringify(value))
    }
  },
  name: 'TrainingScoreboard'
}
</script>
