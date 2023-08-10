import { scrollToElement } from '@/utils/dom'

/**
 * Mixin générique de gestion des formulaires
 */
export default {
  props: {
    /**
     * Model par défaut (Généralement un objet)
     * @model
     */
    modelValue: {
      type: Object,
      required: true
    },
    submit: {
      type: Boolean
    },
    readonly: Boolean
  },
  methods: {
    /**
     * Handler de soumission du formulaire
     */
    onSubmit () {
      /**
       * @event submit
       * @property {any} Le model du formulaire
       */
      this.$emit('submit', this.modelValue)
    },
    /**
     * Scroll vers l'élément en erreur
     * @param v
     */
    onValidationError (v) {
      scrollToElement(v.$el)
    }
  }
}
