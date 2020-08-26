//order matters enums from back end must match indexing
const enums = {
  gender: ['Male', 'Female'],
  maritalStatus: ['Single', 'Married', 'Divorced'],
  policyTerm: ['Short', 'Long'],
  personStatus: ['New', 'Active', 'Deceased', 'Suspended'],
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
  relationships: [
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
};
export default enums;
