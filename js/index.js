import { wasmBrowserInstantiate } from "/js/instantiateWasm.js";

const go = new Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.
const WASM_URL = '/application/wasm.wasm';
var wasm;

function runWasmAdd() {
  if ('instantiateStreaming' in WebAssembly) {
    WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
      wasm = obj.instance;
      go.run(wasm);
      console.log('multiplied add numbers:', wasm.exports.add(5, 3));
    })
  } else {
    fetch(WASM_URL).then(resp =>
        resp.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
          wasm = obj.instance;
          go.run(wasm);
        })
    )
  }
}

runWasmAdd();
