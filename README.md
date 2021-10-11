# Research IT - Training Resources Website

##  What is this site?

This is a website to organise and allow filtering of training resources used by researchers and students at the University of Sheffield. Provided by Research IT from IT Services.

-----

## How to modify the generated website

* To add training links please look at the ``_data/links.yml`` file.
* To change the external links (i.e. those in the footer) please edit the ``_data/externalLinks.yml`` file.
* Adjustments to the theme / page can be made by editing both ``_layouts/default.html`` and  ``_sass/jekyll-theme-cayman-red.scss ``
* Please add assets such as CSS, JS or images in the appropriate subdirectory of ``assets``.
* Other configuration files control aspects of the Jekyll generation of pages e.g.  ``_config.yml``,  ``_data/pages.yml`` and ``training.md``.

-----

## How to build the website

* Install Jekyll - https://jekyllrb.com/docs/installation/

On Ubuntu this looks like:

```
sudo apt-get install ruby-full build-essential zlib1g-dev
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
gem install jekyll bundler
```

* Install the base theme:

```
gem install jekyll-theme-cayman
```

* Have Jekyll autobuild as you make changes:

```
jekyll build --watch --incremental
```

* Open the site in your favorite browser - found in ``_site``

-----

## Acknowledgements

This site was forked from  pawseysc.github.io - much appreciated for the nice starting point and the list of external resources.

## Licensing

The same as pawseysc.github.io, the MIT license as shown in ``LICENSE.md``.
