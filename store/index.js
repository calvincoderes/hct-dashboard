// import Vue from 'vue'
import Vuex from 'vuex'

import moduleTemplate from './module_templates'
import authenticate from './authenticate'
import serviceProviders from './service_providers'
import schedules from './schedules'
import locations from './locations'
import services from './services'
import assistantServices from './assistant_services'
import appointments from './appointments'
import patientRecords from './patient_records'
import page from './page'
import regions from './regions'
import cities from './cities'
import images from './images'
import medicalConditions from './medical_conditions'
import resetPasswords from './reset_passwords'
import registers from './registers'
import myProfiles from './my_profiles'
import recordServices from './record_services'
import userMedicalHistories from './user_medical_histories'
import files from './files'
import leaves from './leaves'
/** REPLACE_IMPORT_STORE */

// Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      moduleTemplate, // Module Boilerplate
      authenticate,
      serviceProviders,
      schedules,
      locations,
      services,
      assistantServices,
      appointments,
      patientRecords,
      page,
      regions,
      cities,
      images,
      medicalConditions,
      resetPasswords,
      registers,
      myProfiles,
      recordServices,
      userMedicalHistories,
      files,
      leaves,
      /** REPLACE_INCLUDE_STORE */
    }
  })
}

export default createStore
