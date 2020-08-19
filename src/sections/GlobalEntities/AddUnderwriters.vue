<template>
  <div>
    <v-dialog v-model="get_underwriterAddModal" persistent width="500">
      <v-form ref="formAdd">
        <v-card>
          <v-card-title
            >Add Underwriter
            <v-spacer></v-spacer>
            <v-btn icon @click="CloseModalAdd()">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" dismissible v-if="get_UnderwriterError != null"></v-alert>
            <v-text-field :rules="[rules.required]" label="Name" v-model="Underwriter.name"> </v-text-field>
            <v-text-field :rules="[rules.required]" label="Commission" type="number" v-model="Underwriter.commission">
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Phone" v-model="Underwriter.phone"> </v-text-field>
            <v-text-field :rules="[rules.required, rules.email]" label="Email" v-model="Underwriter.email">
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Contact Person Name" v-model="Underwriter.contactPerson">
            </v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Contact Person Number"
              v-model="Underwriter.contactPersonNumber"
            >
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Postal Address" v-model="Underwriter.postalAddress">
            </v-text-field>
            <v-text-field :rules="[rules.required]" label="Physical Address" v-model="Underwriter.physicalAddress">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="get_loadingUnderwriter" depressed @click.prevent="AddUnderwriter()">
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
    Underwriter: {
      name: '',
      commission: '',
      phone: '',
      email: '',
      contactPerson: '',
      contactPersonNumber: '',
      postalAddress: '',
      physicalAddress: '',
    },

    rules: {
      required: (v) => !!v || 'This fieled is required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    },
  }),
  methods: {
    ...mapActions(['CloseModalAdd', 'AddNewUnderwriter']),
    AddUnderwriter() {
      if (this.$refs.formAdd.validate()) {
        this.AddNewUnderwriter(this.Underwriter);
      }
    },
  },
  computed: mapGetters(['get_UnderwriterError', 'get_loadingUnderwriter', 'get_Underwriter', 'get_underwriterAddModal']),
  mounted() {
    this.model = true;
  },
};
</script>

<style></style>
