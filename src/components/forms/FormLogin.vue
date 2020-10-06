<template>
  <q-form
    greedy
    @submit="onSubmit"
    ref="form"
    class="q-col-gutter-sm row"
  >
    <q-input v-if="isLogin || isRegister || isForgot"
             v-model="value.username"
             type="text"
             label="Username" class="col-xs-12" />
    <pulsar-password v-if="!isForgot" v-model="value.password"
                  :label="`${isReset ? 'New p' : 'P'}assword` " type="password"
                  class="col-xs-12">
      <template v-if="isLogin" #hint><a href="#" @click.prevent="onForgot">Forgot password ?</a></template>
    </pulsar-password>
    <div class="col-xs-12 flex flex-center">
      <q-btn type="submit" color="green"
             :label="isLogin ? 'Se connecter' : 'Valider'" />
    </div>
    <div class="col-xs-12">
      <q-separator class="q-mt-sm" />
    </div>
    <div class="text-center text-h6 col-xs-12">ou</div>
    <div class="text-center text-h6 col-xs-12">
      <span v-if="isLogin">Créer votre compte</span>
      <span v-else>Vous avez déjà un compte ?<br />Connectez-vous avec vos identifiants.</span>
    </div>
    <div class="text-center col-xs-12">
      <q-btn :color="isLogin ? 'primary' : 'white'" :label="isLogin ? `S'enregistrer` : 'Se connecter'"
             @click="toggleRegister" />
    </div>
  </q-form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import formMixin from '@/mixins/formMixin'
import PulsarPassword from 'components/core/PulsarPassword'
import { loadingHandler } from '@/utils/ui'
import { USER_LOGIN } from '@/store/modules/user/action-types'

const storeUser = createNamespacedHelpers('user')

export default {
  name: 'FormLogin',
  components: { PulsarPassword },
  mixins: [formMixin],
  data () {
    // TODO: Make consts for types
    return {
      type: 'login'
    }
  },
  computed: {
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
    ...storeUser.mapActions({
      login: USER_LOGIN
    }),
    onSubmit () {
      const { value, type } = this
      return loadingHandler(
        async () => {
          switch (type) {
            case 'login':
              await this.login(value)
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
