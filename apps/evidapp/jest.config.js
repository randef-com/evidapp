module.exports = {
  name: 'evidapp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/evidapp',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
