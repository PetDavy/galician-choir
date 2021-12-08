<template>
  <div class="Contact">
    <div class="Contact__contacts">
      <div class="Contact__contacts-group">
        <div class="Contact__contacts-group-title">
          Phone
          <button
            class="Contact__contacts-group-btn"
            @click="handleAddPhone"
          >
            {{isAddingPhone ? 'save contact' : 'add contact'}}
          </button>
        </div>
        <div
          class="Contact__contacts-group-item"
          v-for="(contactItem, index) in contact.phone"
          :key="contactItem"
        >
          {{contactItem}}
          <span class="Contact__contacts-group-remove-btn" @click="deletePhone(index)"></span>
        </div>
        <input
          type="text"
          class="Contact__contacts-group-input"
          v-if="isAddingPhone"
          v-model="newPhone"
        >
      </div>
      <div class="Contact__contacts-group">
        <div class="Contact__contacts-group-title">
          Email
        <button
          class="Contact__contacts-group-btn"
          @click="handleAddEmail"
        >
          {{isAddingEmail ? 'save contact' : 'add contact'}}
        </button>
        </div>
        <div
          class="Contact__contacts-group-item"
          v-for="(contactItem, index) in contact.email"
          :key="contactItem"
        >
          {{contactItem}}
          <span class="Contact__contacts-group-remove-btn" @click="deleteEmail(index)"></span>
        </div>
        <input
          type="text"
          class="Contact__contacts-group-input"
          v-if="isAddingEmail"
          v-model="newEmail"
        >
      </div>
    </div>
    <Socials />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  setDoc,
  doc,
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import Socials from '@/components/Socials.vue';

export default {
  name: 'Contact',
  components: {
    Socials,
  },
  data() {
    return {
      isAddingPhone: false,
      isAddingEmail: false,
      newPhone: '',
      newEmail: '',
    };
  },
  computed: {
    ...mapGetters(['contact', 'db']),
  },
  methods: {
    ...mapMutations(['setContact']),
    handleAddPhone() {
      if (!this.isAddingPhone) {
        this.isAddingPhone = true;
      } else {
        this.addPhone();
      }
    },
    async addPhone() {
      const updatedContact = {
        email: [...this.contact.email],
        phone: [...this.contact.phone, this.newPhone],
      };

      this.updateContact(updatedContact);
      this.isAddingPhone = false;
      this.newPhone = '';
    },
    handleAddEmail() {
      if (!this.isAddingEmail) {
        this.isAddingEmail = true;
      } else {
        this.addEmail();
      }
    },
    async addEmail() {
      const updatedContact = {
        email: [...this.contact.email, this.newEmail],
        phone: [...this.contact.phone],
      };

      this.updateContact(updatedContact);
      this.isAddingEmail = false;
      this.newEmail = '';
    },
    async updateContact(updatedContact) {
      try {
        const cityRef = doc(this.db, 'contact', this.contact.id);

        const docRef = await setDoc(cityRef, updatedContact);

        console.log('Document updated ID: ', docRef);
        this.setContactData();
      } catch (e) {
        console.error('Error updating document: ', e);
      }
    },
    async deletePhone(index) {
      const updatedPhones = this.contact.phone.filter((item, itemIndex) => itemIndex !== index);

      const updatedContact = {
        email: [...this.contact.email],
        phone: updatedPhones,
      };

      this.updateContact(updatedContact);
    },
    async deleteEmail(index) {
      const updatedEmail = this.contact.email.filter((item, itemIndex) => itemIndex !== index);

      const updatedContact = {
        phone: [...this.contact.phone],
        email: updatedEmail,
      };

      try {
        const cityRef = doc(this.db, 'contact', this.contact.id);

        const docRef = await setDoc(cityRef, updatedContact);

        console.log('Document updated ID: ', docRef);
        this.setContactData();
      } catch (e) {
        console.error('Error updating document: ', e);
      }
    },
    setContactData() {
      const q = query(collection(this.db, 'contact'));

      onSnapshot(q, (querySnapshot) => {
        let contact = {};

        querySnapshot.forEach((document) => {
          contact = {
            id: document.id,
            ...document.data(),
          };
        });
        this.setContact({ contact });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .Contact {
    flex: 1;
    display: flex;
    padding: 20px;
    min-height: 70vh;

    @media (max-width: 700px) {
      flex-direction: column;
    }

    &__contacts {
      width: 50%;

      @media (max-width: 700px) {
        width: 100%;
      }
    }

    &__contacts-group {
      background-color: #fff;
      border-radius: 4px;
      margin-bottom: 30px;
    }

    &__contacts-group-title {
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__contacts-group-btn {
      background-color: #15aaff;
      box-shadow: 0 2px 5px rgba(21, 170, 255, 0.4);
      height: 30px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 5px 22px;
      border-radius: 5px;
      margin-left: 20px;
      border: none;
      color: #fff;
      font-size: 15px;
      text-transform: capitalize;
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: 0 2px 5px rgba(21, 170, 255, 0.8);
      }
    }

    &__contacts-group-item {
      position: relative;
      padding: 0 20px 15px;
      width: 100%;
      color: #0d1b3eb3;
    }

    &__contacts-group-input {
      width: calc(100% - 40px);
      margin: 30px 20px 20px;
      border: none;
      border-bottom: 1px solid #ccc;
      padding: 10px 20px;
      font-size: 16px;
      letter-spacing: 1px;
      color: #0d1b3eb3;
      background-color: #f2f2f2;
      border-radius: 4px;

      &:focus {
        outline: none;
        border-bottom: 2px solid #15aaff;
      }

      &::placeholder {
        color: #ccc;
      }
    }

    &__contacts-group-remove-btn {
      position: absolute;
      right: 15px;
      width: 15px;
      height: 15px;
      cursor: pointer;
      transition: transform .3s;

      &:hover {
        transform: scale(1.1);
      }

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #c93c3c;
        border-radius: 1px;
        transform: translateY(-50%) rotate(-45deg);
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: #c93c3c;
        border-radius: 1px;
        transform: translateX(-50%) rotate(-45deg);
      }
    }
  }
</style>
