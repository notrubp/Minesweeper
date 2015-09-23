#!/usr/local/bin/python

import os, sys
import tempfile
import subprocess

compiler = sys.argv[1]
src = sys.argv[2]

for root, _, files in os.walk(src):
  for filename in files:
    ext = os.path.splitext(filename)[1]

    if ext == '.jsc':
      filename = os.path.join(root, filename)

      print filename

      out = filename + '.min.js'

      # wipe the file
      open(out, 'w').close()

      lines = open(filename, 'r').read().splitlines()

      for js in lines:
        print js

        js = os.path.join(root, js)

        if js.endswith('.min.js'):
          # already minified, just append the output file
          open(out, 'a').write(open(js, 'r').read())
        else:
          args = [
            'java',
            '-jar', compiler,
            '--language_in', 'ECMASCRIPT5',
            '--warning_level', 'QUIET',
          ]

          # run through the closure compiler and append to the output file
          _1 = subprocess.Popen(args, stdin=open(js, 'r'), stdout=open(out, 'a'))
          _1.communicate()

