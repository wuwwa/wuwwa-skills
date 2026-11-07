# Liquid Glass JS

Checked 2026-11-07. This upstream library distributes browser source files. The bundle contains an integration recipe; it does not vendor the renderer or provide an npm package.

1. Resolve a commit from [dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js). Read its README, `index.html`, `container.js`, `button.js`, `styles.css` and `glass.css`.
2. Vendor the required source/CSS and `LICENSE` into an isolated directory. The reviewed quick start loads `styles.css` and `glass.css`, then `html2canvas@1.4.1`, `container.js`, and `button.js` in that order. Use the target project's dependency policy for html2canvas.
3. In a browser-only, HTTP-served example after those scripts load:

```js
const button = new Button({ text: 'Save', size: 24, type: 'rounded', onClick: save });
mountPoint.appendChild(button.element);
```

4. Inspect actual DOM/CSS scope, global variables and lifecycle behavior before wrapping it in React/Vue. Do not assume a `destroy()` method. Do not copy demo styling over the host UI.
5. Verify click/keyboard behavior, text legibility, resizing and capture/WebGL failures. Keep an ordinary usable control when the effect is unavailable. Run host checks after integration.

Source: [README and quick start](https://github.com/dashersw/liquid-glass-js/blob/main/README.md). This recipe was checked against source documentation; the runtime has not been tested in Collection.
