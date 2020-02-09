module.exports = {
  name: 'borders',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/borders',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
