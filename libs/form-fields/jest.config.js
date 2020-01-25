module.exports = {
  name: 'form-fields',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/form-fields',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
