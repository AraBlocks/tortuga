# tortuga

My growing gallery of Electron boilerplates and experiments.

Examples favor simplicity.
Most choose the [electron-builder](https://www.electron.build/) path instead of Electron's many others.
I'm intentionally avoiding CLIs and Webpack to preserve *View, Source* awesomeness, and not need a local webserver.

## Branches

- [ ] **master** This readme, and a blank starting point for the other branches.

Build
- [ ] **hello** The minimal working code snippets from [Electron Development in a Nutshell](https://www.electronjs.org/docs/tutorial/first-app#electron-development-in-a-nutshell). 🎂 #helloworld
- [ ] **single** That code, collapsed into as few files as possible. 🤯 #experimental
- [ ] **drag** Download Electron as a `.zip` and drag in your project files, no binaries or command line required. 🤯 #experimental
- [ ] **build** Build binaries and installers for Windows, macOS, and Linux
- [ ] **sign** Sign and notarize on Windows and macOS
- [ ] **update** Update from a regular web server
- [ ] **cylinder** Build the Electron app for a public instance with a web server and UI. 🤯 #experimental

Portable
- [ ] **portable** Run the Electron app entirely from a USB stick plugged into Windows, macOS, or Linux. 🤯 #experimental
- [ ] **native** Electron with a native module.
- [ ] **wasm** WebAssembly instead of C.
- [ ] **xasar** The same `.asar` runs on Windows, macOS, and Linux. 🤯 #experimental

UI
- [ ] **vue** Electron UI using Vue.js
- [ ] **multi** Two windows means three processes

More
- [ ] **log** Exploring best practices for logging in Electron with [debug](https://www.npmjs.com/package/debug), [electron-log](https://www.npmjs.com/package/electron-log), or something else.
- [ ] **kinesis** Send logs to an Amazon bucket.

Web
- [ ] **vfile** Vue in a page from [Getting Started](https://vuejs.org/v2/guide/#Getting-Started). 🎂 #helloworld
- [ ] **vcli** Vue in a project from [Vue CLI](https://cli.vuejs.org/). 🎂 #helloworld

## Cheat sheet

```
$ git clone https://github.com/zootella/tortuga
$ cd tortuga
$ git checkout branch1

$ npm run clean
$ npm run power-wash
$ npm install

$ npm run start
$ npm run build
$ APPLEID=yourid PASSWORD=yourpassword npm run build

$ alias graph="git log --all --decorate --oneline --graph"
$ graph
$ git branch branch1
$ git push -u origin branch1
$ git checkout branch1

$ git status
$ git commit -a -n -m "note"
$ git push

$ git status
$ git pull
$ git checkout branch1
```

## Roadmap

TODO: as you complete this list, build out notes right here for manual QA to demonstrate and test these abilities

Basic stuff everybody needs:

- [ ] **setup:** installers for win/mac/linux, for individual local and non-admin users, know every path it deposits stuff, uninstall, and code signing instructions
- [ ] **update:** update from your website, not a server you or someone else needs to run
- [ ] **tray:** app shortcuts, start menu, taskbar/dock, system tray/mac menu
- [ ] **minimize:** `_[]X`/mac traffic light
- [ ] **html:** windows show html, images, and fonts you brought yourself
- [ ] **startup:** run on startup, do this not as a service, run before login, get startup and shutdown events
- [ ] **protocol:** query and register custom:// and file extensions, test as admin and not
- [ ] **send to:** win ''Send To'' app shortcut, mac drag document onto dock icon
- [ ] **drag:** drag files, folders, and text into a div
- [ ] **instance:** single instance per running location, new launch from start/file extension/browser protocol forwards to running instance
- [ ] **modes:** nonmodal, modal, and disappearing modal windows to let a menu stick out beyond the edges of the window
- [ ] **vue:** change parts of a page with [Vue.js](https://vuejs.org/) and coalesce progress updates with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

The realm of the advanced, weird and experimental:

- [ ] **icons:** high-res and pixel-hinted icons
- [ ] **tile:** full-bleed win10 start menu tile with custom background
- [ ] **portables:** portable editions
- [ ] **portable:** carry a single stick between win/mac/linux
- [ ] **portable asar:** multiple different native modules in a single asar
- [ ] **refresh:** update app on electron browser refresh
- [ ] **p2p:** notify, distribute, and trust updates without a centralized anything
- [ ] **tabs:** tabs like a web browser but made of html and css
- [ ] **repl:** neo-repl ideas, a command-line style prompt in a page that can show form elements, and runs a command app in the same process with close and refresh
- [ ] **markup:** really simple markup becomes page ui

## Opinion

I love [boilerplates](https://github.com/electron/electron-quick-start) (rather than [CLIs](https://www.electronforge.io/)).
The [Electron docs](https://electronjs.org/docs/tutorial/boilerplates-and-clis) say:

> Electron development is unopinionated - there is no "one true way" to develop, build, package, or release an Electron application.

but then also:

> Especially for beginners, using a command line tool is likely to be helpful.

*Totally disagree.*
Boilerplates are much better for learning:
you can see the code rather than having a CLI deliver a huge amount of complexity right from step one.
I've found CLI-generated projects and pipelines to be quite brittle.
Encountering code a CLI generated a few months ago that no longer builds,
it's often easiest to start over from scratch, running the CLI again, and then moving your code into the new fresh project.
Growing your project from a simple boilerplate you can understand and from the start is much better.

In addition to these, check out Electron's list of [awesome boilerplates](https://github.com/sindresorhus/awesome-electron#boilerplates).
