const go = new Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.
const WASM_URL = '/application/wasm.wasm';
var wasm;

function postInstantiate(obj) {
  wasm = obj.instance;
  go.run(wasm);

  // Calling a function exported from Go to JS
  console.log('using Go-defined function to multiply two numbers:', wasm.exports.multiply(5, 3));
}

if ('instantiateStreaming' in WebAssembly) {
  WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(postInstantiate);
} else {
  fetch(WASM_URL).then(resp =>
      resp.arrayBuffer()
  ).then(bytes =>
      WebAssembly.instantiate(bytes, go.importObject).then(postInstantiate)
  )
}

postInstantiate();
