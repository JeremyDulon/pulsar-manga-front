<template>
  <q-form
    greedy
    @submit="onSubmit"
    ref="form"
    class="q-col-gutter-sm row"
  >
    <q-input v-if="isLogin || isRegister || isForgot"
             v-model="modelValue.username"
             type="text"
             label="Username" class="col-xs-12">
      <template #append>
        <q-btn round flat icon="fa fa-chevron-down" tabindex="-1" @click.stop>
          <q-menu fit>
            <q-list>
              <q-item v-for="login in prevLogin" :key="login"
                      v-close-popup
                      clickable @click="$set(modelValue, 'username', login)">
                <q-item-section>
                  <q-item-label>{{ login }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </template>
    </q-input>
    <pulsar-password v-if="!isForgot" v-model="modelValue.password"
                  :label="`${isReset ? 'New p' : 'P'}assword` "
                  class="col-xs-12">
      <template v-if="isLogin" #hint><a href="#" @click.prevent="onForgot">Forgot password ?</a></template>
    </pulsar-password>
    <div class="col-xs-12 flex flex-center">
      <q-btn type="submit" color="green"
             :label="isLogin ? 'Se connecter' : 'Valider'" />
    </div>
<!--    <div class="col-xs-12">-->
<!--      <q-separator class="q-mt-sm" />-->
<!--    </div>-->
<!--    <div class="text-center text-h6 col-xs-12">ou</div>-->
<!--    <div class="text-center text-h6 col-xs-12">-->
<!--      <span v-if="isLogin">Créer votre compte</span>-->
<!--      <span v-else>Vous avez déjà un compte ?<br />Connectez-vous avec vos identifiants.</span>-->
<!--    </div>-->
<!--    <div class="text-center col-xs-12">-->
<!--      <q-btn :color="isLogin ? 'primary' : 'white'" :label="isLogin ? `S'enregistrer` : 'Se connecter'"-->
<!--             @click="toggleRegister" />-->
<!--    </div>-->
  </q-form>
</template>

<script>
import formMixin from '@/mixins/formMixin'
import PulsarPassword from 'components/core/PulsarPassword'
import { loadingHandler } from '@/utils/ui'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'FormLogin',
  components: { PulsarPassword },
  mixins: [formMixin],
  data () {
    // TODO: Make consts for types
    return {
      type: 'login',
      prevLogin: []
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    isLogin () {
      return this.type === 'login'
    },
    isRegister () {
      return this.type === 'register'
    },
    isForgot () {
      return this.type === 'forgot'
    },
    isReset () {
      return this.type === 'reset'
    }
  },
  methods: {
    onSubmit () {
      const { modelValue, type, authStore, $router } = this
      return loadingHandler(
        async () => {
          switch (type) {
            case 'login':
              await authStore.doLogin(modelValue).then(() => {
                $router.push({ name: 'home' })
              })
              break
          }
        }
      )
    },
    onForgot () {
      alert('todo')
    },
    toggleRegister () {
      this.type = this.type === 'register'
        ? 'login'
        : 'register'
    }
  }
}
</script>
