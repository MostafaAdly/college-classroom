module.exports = async (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        /* config options here */
        reactStrictMode: true,
        images: {
            domains: ["upload.wikimedia.org"],
        },
        productionBrowserSourceMaps: false,
    };
    return nextConfig;
};
