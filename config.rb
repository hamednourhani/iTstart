require 'susy'
css_dir = (environment == :production) ? "css/dist" : "css"          #where the CSS will saved
sass_dir = "sass"           #where our .scss files are
javascripts = "js"
images_dir = "images"
fonts_dir = "fonts"
output_style = (environment == :production) ? :compressed : :nested
relative_assets = true
