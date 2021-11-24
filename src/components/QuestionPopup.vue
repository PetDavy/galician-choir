<template>
<div class="QuestionPopup">
  <div class="QuestionPopup__layout"></div>
  <div class="QuestionPopup__content">
    <p class="QuestionPopup__text">
      Are you sure you want to delete this event?
    </p>
    <div class="QuestionPopup__buttons">
      <button
        type="btn"
        class="QuestionPopup__btn QuestionPopup__btn--no btn"
        @click="sentAnswer(false)"
      >
        cancel
      </button>
      <button
        type="btn"
        class="QuestionPopup__btn QuestionPopup__btn--yes btn"
        @click="sentAnswer(true)"
      >
        delet
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'QuestionPopup',
  props: ['questionData'],
  methods: {
    sentAnswer(confirm) {
      if (confirm) {
        this.$emit('handlYes', this.questionData);
      } else {
        this.$emit('handlNo');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .QuestionPopup {
    position: relative;
    z-index: 10;

    &__layout {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 1;
    }

    &__content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 600px;
      padding: 40px;
      background-color: #345b68;
      border-radius: 4px;
      z-index: 2;
    }

    &__text {
      margin-bottom: 40px;
      font-size: 24px;
      line-height: 24px;
      letter-spacing: 1px;
      font-weight: 500;
      text-align: center;
      color: #fff;
    }

    &__buttons {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &__btn {
      margin: 0 20px;

      &--yes {
        background-color: #2984a5;
        color: #fff;
        border: 1px solid #45aacc;
      }

      &--no {
        background-color: #666;
        color: #ccc;
        border: 1px solid #ccc;
      }
    }
  }
</style>
