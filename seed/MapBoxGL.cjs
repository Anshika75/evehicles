const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Array of URLs to be fetched
const urls = [
  'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
  'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js',
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js',
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css'
];

urls.forEach((url) => {
  const protocol = url.startsWith('https') ? https : http;
  const fileName = path.basename(url);
  const savePath = path.join(__dirname, '../public', fileName);

  protocol.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to fetch ${fileName}. Status Code: ${response.statusCode}`);
      return;
    }

    const file = fs.createWriteStream(savePath);

    response.pipe(file);

    file.on('finish', () => {
      file.close(() => {
        console.log(`${fileName} successfully downloaded and saved to public/${fileName}`);
      });
    });
  }).on('error', (err) => {
    console.error(`Error fetching ${fileName}: ${err.message}`);
  });
});
