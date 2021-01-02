<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.activeTime {
  color: yellow;
}
</style>

<template>
  <div class="parent">
    <p
      v-for="(letter, index) in matrix"
      v-bind:key="index"
      v-bind:class="{ activeTime: letter.isActive }"
    >
      {{ letter.letter }}
    </p>
  </div>
</template>

<script>
export default {
  name: "QlockTwo",
  props: {
    msg: String,
  },
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
    this.matrix = this.$config
    this.calculadeTimeInWords();
    // Interval for time change
    setInterval(() => {
      this.calculadeTimeInWords();
    }, 10000);
  },
};
</script>