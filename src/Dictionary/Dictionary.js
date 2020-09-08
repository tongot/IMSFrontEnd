//order matters enums from back end must match indexing
const enums = {
  gender: ['Male', 'Female'],
  maritalStatus: ['Single', 'Married', 'Divorced'],
  policyTerm: ['Short', 'Long'],
  personStatus: ['Active', 'Deceased'],
  typeOfRelationship: [
    'Spouse',
    'Son',
    'Daughter',
    'Father',
    'Mother',
    'Grandmother',
    'Grandfather',
    'Nephew',
    'Niece',
    'Other',
  ],
  idType: ['Birth', 'NationalId', 'Passport', 'DriversLicense'],
  title: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Eng', 'Cmd', 'Miss'],
  personState: [
    { name: 'All', value: '' },
    { name: 'Active', value: 0 },
    { name: 'Deceased', value: 1 },
  ],
};
export default enums;
