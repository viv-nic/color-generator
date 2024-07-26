

const paletteContainer = document.getElementById('palette-container');
    const generateBtn = document.getElementById('generate-btn');
    const schemeSelect = document.getElementById('scheme-select');

    function generatePalette() {
      const scheme = schemeSelect.value;
      let colors;

      switch (scheme) {
        case 'monochromatic':
          colors = chroma.random().scale().colors(5);
          break;
        case 'analogous':
          const baseColor = chroma.random();
          colors = [
            baseColor.set('hsl.h', '-30'),
            baseColor.set('hsl.h', '-15'),
            baseColor,
            baseColor.set('hsl.h', '+15'),
            baseColor.set('hsl.h', '+30')
          ];
          break;
        case 'complementary':
          const color1 = chroma.random();
          const color2 = color1.set('hsl.h', '+180');
          colors = [
            color1,
            color1.brighten(),
            chroma.mix(color1, color2),
            color2.darken(),
            color2
          ];
          break;
        case 'triadic':
          const triadicBase = chroma.random();
          colors = [
            triadicBase,
            triadicBase.set('hsl.h', '+120'),
            triadicBase.set('hsl.h', '+240'),
            chroma.mix(triadicBase, triadicBase.set('hsl.h', '+120')),
            chroma.mix(triadicBase.set('hsl.h', '+120'), triadicBase.set('hsl.h', '+240'))
          ];
          break;
        case 'tetradic':
          const tetradicBase = chroma.random();
          colors = [
            tetradicBase,
            tetradicBase.set('hsl.h', '+90'),
            tetradicBase.set('hsl.h', '+180'),
            tetradicBase.set('hsl.h', '+270'),
            chroma.mix(tetradicBase, tetradicBase.set('hsl.h', '+180'))
          ];
          break;
      }

      paletteContainer.innerHTML = '';
      colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color.hex();
        
        const colorValue = document.createElement('div');
        colorValue.className = 'color-value';
        colorValue.textContent = color.hex();
        
        colorBox.appendChild(colorValue);
        paletteContainer.appendChild(colorBox);
      });
    }

    generateBtn.addEventListener('click', generatePalette);
    schemeSelect.addEventListener('change', generatePalette);

    // Generate initial palette
    generatePalette();