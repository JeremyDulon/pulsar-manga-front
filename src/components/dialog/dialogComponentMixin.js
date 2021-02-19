export default {
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    show () {
      this.showDialog = true
    },
    hide () {
      this.showDialog = false
    }
  }
}
