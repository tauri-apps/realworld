const fs = require('fs')
const path = require('path')
const { safeLoad } = require('js-yaml')
const { spawn } = require('child_process')
const deepmerge = require('deepmerge')

const clone = (repo, directory) => {
  return exec(`git clone ${repo} ${directory}`)
}
const exec = (command, directory = null) => {
  return new Promise((resolve, reject) => {
    const stdOut = []
    const stdErr = []
    const items = command.split(' ')
    const toExec = items.shift()

    const child = spawn(toExec, items, {
      cwd: directory,
      stdio: ['inherit', 'pipe', 'pipe']
    })

    child.stdout.on('data', data => {
      stdOut.push(data.toString('utf8'))
    })

    child.stderr.on('data', data => {
      stdErr.push(data.toString('utf8'))
    })

    child.on('close', () => {
      if (stdErr.length) {
        console.log(stdErr.join(''))
        return
      }
      // resolve(stdOut.join(''))
    })

    child.on('exit', () => {
      resolve(stdOut.join(''))
    })
  })
}
const bundle = async (tauriConfig, directory) => {
  await exec('tauri init', directory)
  const tauriConfigPath = path.join(directory, 'src-tauri', 'tauri.conf.json')
  const mergedTauriConfig = deepmerge(
    JSON.parse(fs.readFileSync(tauriConfigPath)),
    tauriConfig
  )
  fs.writeFileSync(tauriConfigPath, JSON.stringify(mergedTauriConfig, null, 2))
  return exec('tauri build --debug', directory)
}

;(() => {
  try {
    safeLoad(fs.readFileSync('./apps.yaml'))
      .filter(app => (process.argv[2] ? process.argv[2] === app.repo : true))
      .forEach(async app => {
        console.log(`Installing ${app.title} RealWorld example...`)

        try {
          const directory = './apps/' + app.repo.split('/').pop()

          console.log('  Cloning...')

          await clone('https://github.com/' + app.repo, directory)

          console.log('  Installing dependencies...')
          await exec(app.install, directory)
          console.log('  Building app...')
          await exec(app.build, directory)
          console.log('  Bundling...')
          await bundle(app.tauri, directory)
          console.log('Done!')
        } catch (e) {
          console.log('Failure!', e)
        }
      })
  } catch (e) {
    // console.log(e)
  }
})()
