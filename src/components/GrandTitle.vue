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
      :class="{'Grand-title__letter--space': letter.text === ' '}"
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
      background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23DDD' d='M0 0h2v2H0zM2 2h2v2H2zM4 4h2v2H4zM6 6h2v2H6zM8 8h2v2H8zM10 10h2v2h-2zM12 12h2v2h-2zM14 14h2v2h-2zM16 16h2v2h-2zM0 6h2v2H0zM2 8h2v2H2zM4 10h2v2H4zM6 12h2v2H6zM8 14h2v2H8zM10 16h2v2h-2zM6 0h2v2H6zM8 2h2v2H8zM10 4h2v2h-2zM12 6h2v2h-2zM14 8h2v2h-2zM16 10h2v2h-2zM4 16h2v2H4zM2 14h2v2H2zM0 12h2v2H0zM16 4h2v2h-2zM14 2h2v2h-2zM12 0h2v2h-2z'/%3E%3C/svg%3E");
      transition: transform .3s;

      &--space {
        min-width: 50px;
      }
    }
  }

  .Grand-title--hidden {
    .Grand-title__letter {
      transform: translateY(100%);
    }
  }
</style>
