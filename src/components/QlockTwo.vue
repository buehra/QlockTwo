<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 11fr 1fr;
  grid-template-rows: 1fr 10fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border: 1px solid white;
  padding: 1em 0.01em;
  border-radius: 2em;
}
.parent {
  grid-area: 2 / 2 / 3 / 3;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.activeTime {
  color: white;
  text-shadow: white 0px 0px 6px;
}
.oneMinute {
  grid-area: 1 / 1 / 2 / 2;
}
.twoMinutes {
  grid-area: 1 / 3 / 2 / 4;
}
.threeMinutes {
  grid-area: 3 / 1 / 4 / 2;
}
.fourMinutes {
  grid-area: 3 / 3 / 4 / 4;
}
</style>

<template>
  <div class="container">
    <p class="oneMinute">
      <svg height="1em" width="1em">
        <circle
          cx="0.5em"
          cy="0.5em"
          r="0.4em"
          stroke="black"
          v-bind:fill="this.currentOverTime >= 1 ? 'white' : '#222'"
        />
      </svg>
    </p>
    <p class="twoMinutes">
      <svg height="1em" width="1em">
        <circle
          cx="0.5em"
          cy="0.5em"
          r="0.4em"
          stroke="black"
          v-bind:fill="this.currentOverTime >= 2 ? 'white' : '#222'"
        />
      </svg>
    </p>
    <div class="parent">
      <p
        v-for="(letter, index) in matrix"
        v-bind:key="index"
        v-bind:class="{ activeTime: letter.isActive }"
      >
        {{ letter.letter }}
      </p>
    </div>
    <p class="threeMinutes">
      <svg height="1em" width="1em">
        <circle
          cx="0.5em"
          cy="0.5em"
          r="0.4em"
          stroke="black"
          v-bind:fill="this.currentOverTime >= 3 ? 'white' : '#222'"
        />
      </svg>
    </p>
    <p class="fourMinutes">
      <svg height="1em" width="1em">
        <circle
          cx="0.5em"
          cy="0.5em"
          r="0.4em"
          stroke="black"
          v-bind:fill="this.currentOverTime >= 4 ? 'white' : '#222'"
        />
      </svg>
    </p>
  </div>
</template>

<script>
export default {
  name: "QlockTwo",
  data() {
    return {
      currentHours: 0,
      currentMinutes: 0,
      currentOverTime: 0,
      minutes: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      matrix: [],
    };
  },
  computed: {},
  methods: {
    calculadeTimeInWords: function() {
      let currentTime = new Date();
      let currentMinutes = 0;
      for (var key of this.minutes) {
        if (currentTime.getMinutes() >= key) {
          currentMinutes = key;
        }
      }

      this.currentMinutes = currentMinutes;
      this.currentOverTime = currentTime.getMinutes() - this.currentMinutes;
      this.currentHours = (currentTime.getHours() + 1) % 13;

      for (var element of this.matrix) {
        element.isActive = this.isActive(element);
      }
    },
    isActive: function(letter) {
      let isHour = letter.hours == this.currentHours;

      let isMinutes =
        Array.isArray(letter.minutes) &&
        letter.minutes.includes(this.currentMinutes);

      if (letter.alwaysOn || isHour || isMinutes) {
        return true;
      }

      return false;
    },
  },
  mounted() {
    this.matrix = this.$config;
    this.calculadeTimeInWords();
    // Interval for time change
    setInterval(() => {
      this.calculadeTimeInWords();
    }, 10000);
  },
};
</script>