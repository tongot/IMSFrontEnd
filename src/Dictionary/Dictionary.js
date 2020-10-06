//order matters enums from back end must match indexing
const enums = {
  gender: ['Male', 'Female'],
  maritalStatus: ['Single', 'Married', 'Divorced', 'Widowed'],
  policyTerm: ['Short', 'Long'],
  personStatus: ['Active', 'Deceased','InActive'],
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
    { name: 'Inactive', value: 2 },
  ],
};
export default enums;
