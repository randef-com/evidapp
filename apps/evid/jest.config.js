module.exports = {
  name: 'evid',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/evid',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
