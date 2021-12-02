<template>
  <span
    class="animated-arrow"
    :class="{'animated-arrow--open': isOpen}"
  >
    <span class="the-arrow -left">
      <span class="shaft"></span>
    </span>
    <span class="main">
      <span class="text">
        {{isOpen ? 'Hide Details' : 'Explore More'}}
      </span>
      <span class="the-arrow -right">
        <span class="shaft"></span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'ArrowRight',
  props: {
    isOpen: Boolean,
  },
};
</script>

<style lang="scss" scoped>
$black: #808080;
$white: #fff;
$gray: #eaeaea;

$text-arrow-space: 16px;
$shaft-width: 1px;
$newshaft-width: 64px;
$shaft-thickness: 1px;
$arrow-head-width: 8px;
$arrow-head-thickness: $shaft-thickness;

.the-arrow {
  width: $shaft-width;
  transition: all 0.2s;

  &.-left {
    position: absolute;
    top: 50%;
    left: 0;

    .shaft {
      width: 0;
      background-color: $black;

      &:before,
      &:after {
        width: 0;
        background-color: $black;
      }

      &:before {
        transform: rotate(0);
      }

      &:after {
        transform: rotate(0);
      }
    }
  }

  &.-right {
    top: 3px;

    .shaft {
      width: $shaft-width;
      transition-delay: 0.2s;

      &:before,
      &:after {
        width: $arrow-head-width;
        transition-delay: 0.3s;
        transition: all 0.5s;
      }

      &:before {
        transform: rotate(40deg);
      }

      &:after {
        transform: rotate(-40deg);
      }
    }
  }

  .shaft {
    background-color: $black;
    display: block;
    height: $shaft-thickness;
    position: relative;
    transition: all 0.2s;
    transition-delay: 0;
    will-change: transform;

    &:before,
    &:after {
      background-color: $black;
      content: '';
      display: block;
      height: $arrow-head-thickness;
      position: absolute;
      top: 0;
      right: 0;
      transition: all 0.2s;
      transition-delay: 0;
    }

    &:before {
      transform-origin: top right;
    }

    &:after {
      transform-origin: bottom right;
    }
  }
}

.animated-arrow {
  position: absolute;
  top: 50%;
  display: inline-flex;
  align-items: center;
  color: $black;
  font-size: 1.25em;
  // font-style: italic;
  text-decoration: none;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.2s;
  transition-delay: .3s;
  z-index: 2;

  &--open {
    top: 30px;
    right: 0;
    transform: translateY(0);

    @media (max-width: 1600px) {
      right: 40px;
    }

    @media (max-width: 1200px) {
      right: initial;
    }

    .-left {
      left: 40px;
      transform: scale(-1);
    }

    .-right {
      display: none;
    }
  }

  &:hover {
    color: $gray;

    .the-arrow.-left {
      .shaft {
        width: $newshaft-width;
        transition-delay: 0.1s;
        background-color: $gray;

        &:before,
        &:after {
          width: $arrow-head-width;
          transition-delay: 0.1s;
          background-color: $gray;
        }

        &:before {
          transform: rotate(40deg);
        }

        &:after {
          transform: rotate(-40deg);
        }
      }
    }

    .main {
      transform: translateX($shaft-width + $text-arrow-space);
      transform: translateX($newshaft-width + $text-arrow-space);

      .the-arrow.-right {
        .shaft {
          width: 0;
          transform: translateX(200%);
          transition-delay: 0;

          &:before,
          &:after {
            width: 0;
            transition-delay: 0;
            transition: all 0.1s;
          }

          &:before {
            transform: rotate(0);
          }

          &:after {
            transform: rotate(0);
          }
        }
      }
    }
  }

  .main {
    display: flex;
    align-items: center;
    transition: all 0.2s;

    .text {
      margin: 0 $text-arrow-space 0 0;
      line-height: 1;
    }

    .the-arrow {
      position: relative;
    }
  }
}
</style>
