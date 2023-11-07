const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

const processImages = async () => {
  const imageminModule = await import('imagemin');
  const imageminWebpModule = await import('imagemin-webp');

  fs.readdirSync(target).forEach(async (image) => {
    const imageName = image.split('.')[0];

    // Process for large size
    await sharp(`${target}/${image}`)
      .resize(800)
      .toFile(path.resolve(__dirname, `${destination}/${imageName}-large.jpg`))
      .then(async () => {
        // Compress the large image to webp format
        await imageminModule.default([`${destination}/${imageName}-large.jpg`], {
          destination: destination,
          plugins: [imageminWebpModule.default({ quality: 75 })],
        });

        // Keep the large image in jpg format
        fs.copyFileSync(
          path.resolve(__dirname, `${destination}/${imageName}-large.jpg`),
          path.resolve(__dirname, `${destination}/${imageName}-large.webp`)
        );
      });

    // Process for small size
    await sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(__dirname, `${destination}/${imageName}-small.jpg`))
      .then(async () => {
        // Compress the small image to webp format
        await imageminModule.default([`${destination}/${imageName}-small.jpg`], {
          destination: destination,
          plugins: [imageminWebpModule.default({ quality: 75 })],
        });

        // Keep the small image in jpg format
        fs.copyFileSync(
          path.resolve(__dirname, `${destination}/${imageName}-small.jpg`),
          path.resolve(__dirname, `${destination}/${imageName}-small.webp`)
        );
      });
  });
};

processImages();
