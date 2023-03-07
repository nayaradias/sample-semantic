const package = require("./package.json");
const fs = require('fs/promises');
const plist = require('simple-plist');
const { exit } = require("process");

const args = process.argv.slice(2);

const generateVersionCode = (version = '') => {
  return version.split('.').map((s, i) => {
    if (i === 0) {
      return ("90" + s).slice(-3);
    }

    if (i === 1) {
      return ("000" + s).slice(-3);
    }

    if (i === 2) {
      return ("000" + s).slice(-3);
    }
  }).join("");
}

(async () => {
  const version = args[0] || package.version;
  const versionCode = generateVersionCode(version);

  try {
    console.log("Bumping iOS: " + version);

    const infoPlist = plist.parse(await fs.readFile('./ios/sampleSemantic/Info.plist'));
    infoPlist.CFBundleShortVersionString = version;
    await fs.writeFile('./ios/sampleSemantic/Info.plist', plist.stringify(infoPlist));

    const pbxproj = await fs.readFile('./ios/sampleSemantic.xcodeproj/project.pbxproj', 'utf8');
    const pbxprojFormated = pbxproj.replaceAll(/MARKETING_VERSION = ([0-9.]){2,}/gi, `MARKETING_VERSION = ${version}`);
    await fs.writeFile('./ios/sampleSemantic.xcodeproj/project.pbxproj', pbxprojFormated, 'utf8');
  } catch (error) {
    console.error(error);
    exit(-1);
  }

  try {
    console.log("Bumping Android: " + version + " | " + versionCode);

    const androidData = await fs.readFile('./android/app/build.gradle', { encoding: 'utf-8' });

    var result = androidData
      .replace(/versionCode ([0-9.]){2,}/gi,    `versionCode ${versionCode}`)
      .replace(/versionName "([0-9.]){2,}"/gi,  `versionName "${version}"`)

    await fs.writeFile('./android/app/build.gradle', result, 'utf8');
  } catch (error) {
    console.error(error);
    exit(-1);
  }
})();
