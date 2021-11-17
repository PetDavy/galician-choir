<template>
  <div
    class="Loader"
    :class="{
      'Loader__is-zooming': isZooming,
      'Loader__is-loading': isVisible
      }"
  >
    <div class="loader-butterfly"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data() {
    return {
      isZooming: false,
      isLoading: true,
    };
  },
  props: {
    isVisible: Boolean,
  },
  mounted() {
    setTimeout(() => {
      this.isZooming = true;
    });
  },
};
</script>

<style lang="scss" scoped>
  $time: 1s;

  .Loader {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: #1d1d1d;
    z-index: 10;
    transition: opacity 0.5s ease-out;
    opacity: 0;

    &__is-zooming {
      .loader-butterfly  {
        transform: rotateZ(-26deg) scale(1);
      }
    }

    &__is-loading {
      opacity: 1;
    }
  }

  .loader-butterfly {
    position: absolute;
    top: calc(50% - 60px);
    left: calc(50% - 72px);
    font-size: 72px;
    width: 2em;
    height: 2em;
    transform: rotateZ(-26deg) scale(0.4);
    animation: insect-fly $time/3 infinite alternate;
    transition: transform 0.8s;

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 1em;
      height: 1.5em;
      border: 1px solid #ccc;
      background-color: #f4f4f4;
      animation: wings $time/3 infinite alternate;
    }

    &:before {
      left: 0;
      border-radius: 40% 20% 50% 50%;
      transform-origin: right center;
    }

    &:after {
      right: 0;
      border-radius: 20% 40% 50% 50%;
      transform-origin: left center;
      animation-direction: alternate-reverse;
    }

    @keyframes wings {
      from {
          transform: rotateX(60deg) rotateY(-60deg);
      }
      to {
          transform: rotateX(60deg) rotateY(60deg);
      }
    }

    @keyframes insect-fly {
      from {
        margin-top: -.2em;
      }
      to {
        margin-top: .2em;
      }
    }
  }
</style>
