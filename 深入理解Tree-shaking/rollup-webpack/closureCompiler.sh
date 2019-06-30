java -version
java -jar ./libs/closure-compiler-v20170626.jar --compilation_level ADVANCED_OPTIMIZATIONS --process_common_js_modules --transform_amd_modules --language_in ECMASCRIPT6 --js src/main.js --js src/util.js --js src/menu.js --js_output_file cc.bundle.js --process_common_js_modules
