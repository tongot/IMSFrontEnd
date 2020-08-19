<template>
  <div>
    <v-dialog v-model="get_underwriterEditModal" persistent width="500">
      <v-form v-if="get_Underwriter != null" ref="formUpdate">
        <v-card>
          <v-card-title
            >Edit Underwriter
            <v-spacer></v-spacer>
            <v-btn icon @click="CloseModal()">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" dismissible v-if="get_UnderwriterError != null"></v-alert>
            <v-text-field :rules="[rules.required]" label="Name" v-model="get_Underwriter.name"> </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Commission"
              type="number"
              v-model="get_Underwriter.commission"
            >
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Phone" v-model="get_Underwriter.phone"> </v-text-field>
            <v-text-field :rules="[rules.required, rules.email]" label="Email" v-model="get_Underwriter.email">
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Contact Person Name" v-model="get_Underwriter.contactPerson">
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Contact Person Number"
              v-model="get_Underwriter.contactPersonNumber"
            >
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Postal Address" v-model="get_Underwriter.postalAddress">
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Physical Address" v-model="get_Underwriter.physicalAddress">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="get_loadingUnderwriter" depressed @click.prevent="UpdateUnderwriter()">
              <v-icon left>
                mdi-content-save
              </v-icon>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: () => ({
    model: false,
    rules: {
      required: (v) => !!v || 'This fieled is required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    },
  }),
  methods: {
    ...mapActions(['CloseModal', 'UpdateUnderwriter']),
    Update() {
      if (this.$refs.formUpdate.validate()) {
        this.UpdateUnderwriter(this.get_Underwriter);
      }
    },
  },
  computed: mapGetters([
    'get_UnderwriterError',
    'get_loadingUnderwriter',
    'get_Underwriter',
    'get_underwriterEditModal',
  ]),
  mounted() {
    this.model = true;
  },
};
</script>

<style></style>
