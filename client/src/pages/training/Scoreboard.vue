<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon class="white--text" @click.stop="$store.commit('drawer', !$store.state.drawer)"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Scoreboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'TrainingOverview' }" exact icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-side-icon
        v-if="$store.state.authenticated"
        class="white--text"
        @click.stop="$store.commit('rightDrawer', !$store.state.rightDrawer)"
      ></v-toolbar-side-icon>
    </v-toolbar>
    <v-container grid-list-lg fluid>
      <v-breadcrumbs v-if="$vuetify.breakpoint.smAndUp">
        <v-icon slot="divider">fiber_manual_record</v-icon>
        <v-breadcrumbs-item :to="{ name: 'TrainingOverview' }" exact>
          Training
        </v-breadcrumbs-item>
        <v-breadcrumbs-item>
          Scoreboard
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-layout row>
        <v-flex xs12>
          <div v-if="currentBreak === ''" class="display-4 font-weight-light text-xs-center">
            {{ score }}
          </div>
          <div v-else class="display-4 font-weight-light text-xs-center">
            {{ currentBreak || 0 }}
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
              <v-progress-linear class="auto-ok-progress mb-0 mt-1" v-model="lastInputAutoOKCounter" height="5"></v-progress-linear>
              <v-btn @click="ok()" :disabled="currentBreak === '' || currentBreak === '-'" class="elevation-0 mt-0 ok-button" color="primary" block large>OK</v-btn>
            </div>
            <v-btn style="grid-area: undo" @click="undo()" v-if="breaks.length > 0" class="elevation-0 mt-3" color="primary" block large>Undo</v-btn>
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
  grid-template-rows: 50px 50px 50px 50px 50px;
  grid-template-areas: "num num num"
                       "num num num"
                       "num num num"
                       "num num num"
                       "ok ok ok"
                       "undo undo undo";
  grid-column-gap: 18px;
  grid-row-gap: 10px;
  justify-items: center;
}
.number-button {
  height: 50px;
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
  height: 60px;
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
      dateTime: new Date().toISOString(),
      lastInputAutoOK: null,
      lastInputAutoOKCounter: 0,
      lastInputAutoOKInterval: null,
      score: 0,
      currentBreak: '',
      breaks: []
    }
  },
  methods: {
    inputNumber(value) {
      this.resetTimers()

      // If minus, then the length can be 4, else 3 characters
      if (this.currentBreak.indexOf('-') !== -1) {
        if (this.currentBreak.length === 4) return
      } else {
        if (this.currentBreak.length === 3) return
      }

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
    }
  },
  name: 'TrainingScoreboard'
}
</script>
