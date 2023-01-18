<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-form ref="form" lazy-validation @submit.prevent="submit">
        <v-text-field v-model="message" :rules="[v => !!v || 'Message is required']" label="Message"
          required></v-text-field>
        <v-btn type="submit" color="primary" :disabled="!message" depressed>Submit</v-btn>
      </v-form>
    </v-col>
    <v-col cols="12">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card max-width="500" tile>
            <v-list flat>
              <v-subheader>INPUTS</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(m, i) in messages" :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-text="m.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    message: '',
    messages: []
  }),
  created() {
    const db = this.$fire.firestore
    const colRef = db.collection('inputs')
    colRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          let doc = change.doc
          this.messages.push({ text: doc.data().text })
        }
      })
    })
  },
  methods: {
    async submit() {
      await this.$axios.$post('http://127.0.0.1:5001/mamamia-d3690/us-central1/saveMessage', { message: this.message })
      this.$refs.form.reset()
    }
  }
}
</script>
