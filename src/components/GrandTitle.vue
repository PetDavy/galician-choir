<template>
  <div
    class="Grand-title Grand-title--hidden"
    :style="{[position.type]: `${position.size}px`}"
    data-observer="grand-title"
  >
    <span
      class="Grand-title__letter"
      v-for="letter in letters"
      :key="letter.id"
      :style="{transitionDelay: `${letter.id * 80}ms`}"
      :class="{
        'Grand-title__letter--space': letter.text === ' ',
        [`Grand-title__letter--${color}`]: color
      }"
    >
      {{letter.text}}
    </span>
  </div>
</template>

<script>
import observer from '@/utils/observers';

export default {
  name: 'GrandTitle',
  props: {
    titleText: String,
    align: String,
    color: String,
  },
  computed: {
    letters() {
      return this.titleText.split('').map((letter, index) => ({ text: letter, id: index }));
    },
    position() {
      const [type, size] = this.align.split(':');
      return { type, size };
    },
  },
  mounted() {
    observer.setObservers();
  },
};
</script>

<style lang="scss" scoped>
  .Grand-title {
    position: absolute;
    display: flex;
    overflow: hidden;

    &__letter {
      font-size: 110px;
      font-weight: 500;
      opacity: 0.7;
      text-transform: uppercase;
      background-repeat: repeat;
      background-position: top left;
      background-clip: content-box;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'%3E%3Cpath fill='%23666' d='M0 0h2v2H0zM2 2h2v2H2zM4 4h2v2H4zM6 6h2v2H6zM8 8h2v2H8zM10 10h2v2h-2zM12 12h2v2h-2zM14 14h2v2h-2zM16 16h2v2h-2zM0 6h2v2H0zM2 8h2v2H2zM4 10h2v2H4zM6 12h2v2H6zM8 14h2v2H8zM10 16h2v2h-2zM6 0h2v2H6zM8 2h2v2H8zM10 4h2v2h-2zM12 6h2v2h-2zM14 8h2v2h-2zM16 10h2v2h-2zM4 16h2v2H4zM2 14h2v2H2zM0 12h2v2H0zM16 4h2v2h-2zM14 2h2v2h-2zM12 0h2v2h-2z'/%3E%3C/svg%3E");
      transition: transform .3s;

      @media (max-width: 1000px) {
        font-size: 64px;
      }

      @media (max-width: 550px) {
        font-size: 45px;
      }

      &--space {
        min-width: 50px;

        @media (max-width: 550px) {
          min-width: 25px;
        }
      }

      &--light {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'%3E%3Cpath fill='%23fff' d='M0 0h2v2H0zM2 2h2v2H2zM4 4h2v2H4zM6 6h2v2H6zM8 8h2v2H8zM10 10h2v2h-2zM12 12h2v2h-2zM14 14h2v2h-2zM16 16h2v2h-2zM0 6h2v2H0zM2 8h2v2H2zM4 10h2v2H4zM6 12h2v2H6zM8 14h2v2H8zM10 16h2v2h-2zM6 0h2v2H6zM8 2h2v2H8zM10 4h2v2h-2zM12 6h2v2h-2zM14 8h2v2h-2zM16 10h2v2h-2zM4 16h2v2H4zM2 14h2v2H2zM0 12h2v2H0zM16 4h2v2h-2zM14 2h2v2h-2zM12 0h2v2h-2z'/%3E%3C/svg%3E");
      }

      @media (max-width: 700px) {
        background-image: url("data:image/svg+xml,%3Csvg width='26' height='26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23666' d='M0 0h26v26H0z'/%3E%3C/svg%3E");
      }
    }
  }

  .Grand-title--hidden {
    .Grand-title__letter {
      transform: translateY(100%);
    }
  }
</style>
