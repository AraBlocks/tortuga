# tortuga

Electron apps are all the same!
Why doesn't someone write a sample project that demonstrates a common shell container for one?
That would get your new app going from zero to ship-it in a snap. 😁
It would also neatly [separate concerns](https://en.wikipedia.org/wiki/Separation_of_concerns).

The example would always favor simplicity.
It would avoid Webpack to preserve *View, Source* awesomeness, and not need a local webserver.

That'd be cool.
OK, fine, I'll do it.
You could probably even turn it into a book. 🤔

```
$ git clone https://github.com/zootella/tortuga
$ npm install
$ npm run start
```

## Roadmap

Basic stuff everybody needs:

- [ ] **setup** installers for win/mac/linux, lists of paths where it deposits stuff, and uninstall
- [ ] **update** updates without needing your own server, just a spot on the web to put some files
- [ ] **tray** app shortcuts, start menu, taskbar/dock, system tray/mac menu
- [ ] **minimize** `_[]X`/mac traffic light
- [ ] **html** windows show html, images, and fonts you brought yourself
- [ ] **startup** run on startup, do this not as a service, run before login, get startup and shutdown events
- [ ] **protocol** query and register custom:// and file extensions, test as admin and not
- [ ] **instance** single instance per running location, new launch from start/file extension/browser protocol forwards to running instance
- [ ] **modes** nonmodal, modal, and disappearing modal windows to let a menu stick out beyond the edges of the window
- [ ] **vue** change parts of a page with [Vue.js](https://vuejs.org/) and collapse progress updates with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

The realm of the advanced, weird and experimental:

- [ ] **icons** high-res and pixel-hinted icons
- [ ] **tile** full-bleed win10 start menu tile with custom background
- [ ] **portable** edition
- [ ] **asar** cross platform asar with native modules
- [ ] **refresh** update app on electron browser refresh
- [ ] **p2p** updates
- [ ] **tabs** tabs like a web browser but made of html and css
- [ ] **repl** neo-repl ideas, a command-line style prompt in a page that can show form elements, and runs a command app with close and refresh
- [ ] **markup** really simple markup becomes page ui

Intentionally avoiding:

- local webserver
- webpack
- live update



