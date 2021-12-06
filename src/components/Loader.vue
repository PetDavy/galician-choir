<template>
  <div
    class="Loader"
    :class="{
      'Loader__is-zooming': isZooming,
      'Loader__is-loading': isVisible
      }"
  >
    <div class="loader-camertone-wrapper">
      <div class="loader-camertone"></div>
    </div>
    <div class="loader-camertone-wave"></div>
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
    background-color: #fff;
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

  .loader-camertone-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 53px;
    height: 200px;
    transform: translate(-50%, -50%);

    animation: camerton-zoom-out 0.3s;
  }

  .loader-camertone {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='54' height='201' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.2185 1.25C.4609 2.15.2083 16.0502.2083 57.7502c0 52.0999.0842 55.5999 1.5995 60.2999 2.2729 7.1 6.7345 13.2 12.2063 16.6l4.7142 2.9v27.2c0 25.9.4209 33.8 1.9362 34.8 2.2729 1.4 10.1018 1.5 11.3645 0 .7576-.9 1.852-15.2 1.852-35v-27l4.2933-2.4c5.1351-3 11.0278-10.5 13.0481-16.9 1.4311-4.3 1.5995-9.3 1.852-59.7999.1684-49.7.0842-55.3-1.0943-56.8-1.9362-2.2-11.5329-2.2-13.3849 0-1.1786 1.4-1.3469 7.7-1.3469 55.1 0 51.9999-.0842 53.6999-1.6837 56.7999-3.4514 6.6-11.2803 8.3-15.8261 3.3-4.3775-4.8-4.3775-4.7-4.3775-61.6999 0-51.4-.0842-53.1-1.5994-54.1-2.2729-1.4-11.2804-1.3-12.5431.2Zm8.4182 59.7001.2525 52.8999 2.5255 4.4c7.7447 13 22.8132 11.6 29.2952-2.7 1.852-3.9 1.852-5 2.1045-55.7999 0-51.7.421-51.7 1.4311-51.7 1.0944 0 1.2628 7.1 1.2628 52.2 0 48.7999-.1684 52.5999-1.5995 56.2999-2.1887 5.5-7.2396 11-12.2905 13.2l-4.2091 1.9-.2526 27.2c-.1683 26.3-.4209 35.7-2.0203 35.7-1.5995 0-1.5153-9.4-1.6836-35.7l-.2526-27.2-3.704-1.7c-4.9667-2.1-9.7651-7-12.1222-12.2-1.852-4.2-1.852-4.5-2.1045-56.9999-.2526-52.2-.1684-52.7 1.431-52.7 1.6837 0 1.7679.7 1.9363 52.9Z' fill='%23000'/%3E%3C/svg%3E");
    transform-origin: bottom right;
    background-repeat: no-repeat;
    background-size: contain;
    transition: transform 0.2s;

    animation: camerton-tilt 0.4s ease-out 0.2s;
  }

  .loader-camertone-wave {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 250px;
    width: 500px;
    border-radius: 50%;
    background: radial-gradient(68% 68% at 50% 50%, rgba(85, 46, 182, 0) 61%, #d9d9d9 100%);
    transform: translate(-50%, -50%);
    opacity: 0;
    filter: blur(2px);

    animation: wave-move 0.7s ease-out 0.5s;
  }

  @keyframes camerton-zoom-out {
    from {transform: translate(-50%, -50%) scale(0.7)}
    to {transform: translate(-50%, -50%) scale(0.9)}
  }

  @keyframes camerton-tilt {
    0% {transform: rotate(0)}
    30% {transform: rotate(-5deg)}
    80% {transform: rotate(15deg)}
  }

  @keyframes wave-move {
    0% {opacity: 0; width: 500px; height: 250px;}
    10% {opacity: 0.8; width: 500px; height: 250px;}
    90% {opacity: 0.8; width: 2000px; height: 1000px;}
    100% {opacity: 0.1; width: 2500px; height: 1250px;}
  }
</style>
