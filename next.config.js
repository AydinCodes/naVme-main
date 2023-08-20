/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack: (config) => {
      // Exclude .map files from being loaded by Webpack
      config.module.rules.push({
        test: /\.map$/,
        use: ['ignore-loader']
      });
  
      return config;
    }
  }
  
  