module.exports = {
  name: 'demo-co-docs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/demo-co-docs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
