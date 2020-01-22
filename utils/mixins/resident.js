export default {
  data () {
    return {
      statuses: [
        { value: 'BASIC', text: 'Not yet verified' },
        { value: 'VERIFIED', text: 'Verified' },
      ],
      genders: [
        { value: 'MALE', text: 'Male' },
        { value: 'FEMALE', text: 'Female' },
      ],
      civil_statuses: [
        { value: 'SINGLE', text: 'Single' },
        { value: 'MARRIED', text: 'Married' },
        { value: 'WIDOWED', text: 'Widowed' },
        { value: 'SEPARATED', text: 'Separated' },
        { value: 'DIVORCED', text: 'Divorced' },
      ],
      blood_types: [
        { value: 'O+', text: 'O+' },
        { value: 'O-', text: 'O-' },
        { value: 'A+', text: 'A+' },
        { value: 'A-', text: 'A-' },
        { value: 'B+', text: 'B+' },
        { value: 'B-', text: 'B-' },
        { value: 'AB+', text: 'AB+' },
        { value: 'AB-', text: 'AB-' }
      ]
    }
  }
}
