/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Esto permite que el build termine exitosamente aunque
    // tu proyecto tenga errores de TypeScript.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Esto ignora los errores de ESLint durante el build.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig