# TinyGo <> WASM "hello world" webapp

### What is this?

A minimal setup example where TinyGo is compiled to a WASM executable
runnable in the browser. We demonstrate a Go function export which can be 
called from JS, and a JS function export which can be called from Go.

## Dependencies

The following instructions assume OSX 10.13+.

Install Golang and TinyGo if you don't already have them. 
```
brew install go tinygo
```
Golang 1.13 is the minimum version needed to support TinyGo. Check `go version` 
to make sure you have it.

Copy `tinygo`'s version of `wasm_exec.js` into your project root. 
This file must match the binary you use to build your WASM.
```
cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js .
```

Install `goexec`.
```
go mod init <your package name>
go get -u github.com/shurcooL/goexec
```


## Run

Compile project to WASM.
```
make build
```

Run a web server.
```
make serve
```
Note that we use `goexec` to serve (see `Makefile`) because you _must_ use a
server that's aware of the WASM MIME type. A Python `http.server` won't work.

Go to `localhost:8080` in your browser. If all has gone well, you should see 
"hello webassembly!" in the JS console.

### Troubleshooting

If in doubt, triple-check that the version of `wasm_exec.js` in your local 
filesystem and loaded in your browser is as expected. A mismatched 
`wasm_exec.js` seemed to be the cause of most issues I ran into while setting 
up.


## Resources
- [Lin Clark's illustrated intro to WASM](https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/)
- [Golang<>WASM quickstart](https://github.com/golang/go/wiki/WebAssembly)
- [Very helpful debug journal of a TinyGo<>WASM setup | Mariano Gappa](https://marianogappa.github.io/software/2020/04/01/webassembly-tinygo-cheesse/)

Don't want to run TinyGo locally? You can also grab a prebuilt `docker` image 
from Docker Hub.
```
docker run -v $GOPATH:/go -e "GOPATH=/go" tinygo/tinygo:0.18.0 tinygo build -o main.wasm
```
