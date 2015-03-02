require 'susy'
css_dir = (environment == :production) ? "dist/css/temp" : "dist/css"          #where the CSS will saved
sass_dir = "dist/css/sass"           #where our .scss files are
javascripts = "dist/js"
images_dir = "dist/images"
fonts_dir = "dist/fonts"
output_style = (environment == :production) ? :compressed : :nested
relative_assets = true
