
module.exports = {
  baseBranch: "main",
  tagFormat: "${version}",
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",

    "@semantic-release/github",
    "@semantic-release/npm",
    ["@semantic-release/exec", {
      "prepareCmd": "node .version.js ${nextRelease.version} ${options.branch} ${commits.length} ${Date.now()}"
    }],
    ["@semantic-release/git", {
      "assets": [
        "package.json",
        "CHANGELOG.md",
        "./ios/sampleSemantic/Info.plist",
        "./ios/sampleSemantic.xcodeproj/project.pbxproj",
        "./android/app/build.gradle"
      ]
   }],
  ],
}
