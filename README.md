# Phaser Tilemap Generator Plugin
By Joel Dies

[Demo](http://codepen.io/phreaknation/details/ygPwJJ/)

A really simple implementation of a perlin noise generator which allows nearly any generator to be used. [Perlin Noise library](https://github.com/wwwtyro/perlin.js) came from [Rye Terrell](https://github.com/wwwtyro).

**This is not 100% documented but is on its way to being 100% documented.**

Help support these efforts by becoming a [Patreon](https://www.patreon.com/user?u=4928922)

If you wish to use this plugin in a commercial product, or get the full source [you may do so this way](https://gum.co/saeeA).

## Including in a project
Include the script into your html page.

Required Modules:

 + [Utilities](https://github.com/phreaknation/phreaknation.utilities)
 + [Lodash](lodash.com) [CDNJS](https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js)


```
<script src="/path/to/plugin/lodash.min.js"></script>

<script src="/path/to/plugin/phreaknation.utilities.min.js"></script>
<script src="/path/to/plugin/phreaknation.generator.tilemap.min.js"></script>
```

In your create of your phaser project.

```
game.plugins.add(PhreakNation.Plugins.TilemapGenerator);
```


#### Example:
See included files

## Calls

### version()
Return the plugin version.

#### Example:
```
mapgen.version();
```

### description()
Return a description of this plugin.

#### Example:
```
mapgen.description();
```

** More details coming soon **
