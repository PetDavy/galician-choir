<template>
  <section class="About">
    <div class="About__container">
      <GrandTitle titleText="about choir"/>
      <div class="About__content side-indent">
        <div class="About__block">
          <div class="About__info">
            <div class="About__info-top">
              <h3 class="About__info-title">Galytskii Lviv Choir</h3>
              <p class="About__info-sub-title">Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
            </div>
            <p class="About__info-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum molestias neque suscipit quae ratione eaque tenetur repudiandae, possimus modi est.
            </p>
            <p class="About__info-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sit quaerat doloremque incidunt nostrum obcaecati autem voluptates neque! Cupiditate ex quia corrupti incidunt tempora ut, autem in qui quaerat?</p>
          </div>
          <div class="About__image-wrapper">
            <img
              src="https://stpetersgeneva.org/wp-content/uploads/sites/4/2017/11/spcaa-choir-performing-705x337.jpg"
              alt="choir"
              class="About__image"
            >
          </div>
        </div>
        <div class="About__block">
          <div class="About__grand-title-wrapper">
            <GrandTitle titleText="conductor" align="right" />
          </div>
          <div class="About__image-wrapper">
            <img
              src="https://www.morristonorpheus.com/resource/AlwynCarnegie1.jpg"
              alt="conductor"
              class="About__image"
            >
          </div>
          <div class="About__info">
            <div class="About__info-top">
              <h3 class="About__info-title">Roman Bagriy</h3>
              <p class="About__info-sub-title">Lorem ipsum dolor sit, amet consectetur.</p>
            </div>
            <p class="About__info-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum molestias neque suscipit quae ratione eaque tenetur repudiandae, possimus modi est.
            </p>
            <p class="About__info-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sit quaerat doloremque incidunt nostrum obcaecati autem voluptates neque! Cupiditate ex quia corrupti incidunt tempora ut, autem in qui quaerat?</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GrandTitle from '@/components/GrandTitle.vue';

export default {
  name: 'About',
  components: {
    GrandTitle,
  },
};
</script>

<style lang="scss" scoped>
  .About {
    &__container {
      position: relative;
    }

    &__content {
      padding-top: 180px;
    }

    &__block {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 240px;
      padding-right: 60px;

      &:nth-child(odd) {
        .About__info {
          min-width: 50%;
          flex: 1;
          margin-right: 20px;
        }
      }

      &:nth-child(even) {
        .About__info {
          min-width: 56%;
          margin-left: 20px;

          &__info-top {
            max-width: 900px;
          }

          &__info-description {
            max-width: 800px;
          }
        }

        .About__grand-title-wrapper {
          position: absolute;
          top: -100px;
          right: 0;
        }
      }
    }

    &__info-top {
      max-width: 800px;
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #ccc;
    }

    &__info-title {
      font-size: 35px;
      line-height: 42px;
      margin-bottom: 15px;
      text-transform: uppercase;
      font-weight: 700;
    }

    &__info-sub-title {
      font-size: 15px;
      line-height: 19px;
      color: #333;
      font-weight: 600;
      letter-spacing: 0.8px;
    }

    &__info-description {
      max-width: 700px;
      margin-bottom: 12px;
      font-size: 15px;
      line-height: 30px;
      color: #333;
      letter-spacing: 0.8px;
    }

    &__image-wrapper {
      position: relative;
      width: 500px;
      padding-top: 32%;
      border-radius: 5px;
    }

    &__image {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      left: 0;
      display: block;
      object-fit: cover;
      object-position: center;
      border-radius: 5px;
    }
  }
</style>
