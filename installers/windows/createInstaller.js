var createWindowsInstaller =  require('electron-winstaller').createWindowsInstaller;
var path = require('path');

getInstallerConfig()
     .then(createWindowsInstaller)
     .catch((error) => {
     console.error(error.message || error)
     process.exit(1)
 })

function getInstallerConfig () {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
       appDirectory: path.join('./', 'release-builds')
       outputDirectory: path.join(outPath, 'windows-installer'),
       exe: 'Time Manager.exe',
       setupExe: 'TimeManagerInstaller.exe',
       setupIcon: path.join(rootPath, 'recources', 'icons', 'icon.ico')
   })
}
