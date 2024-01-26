/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_LOCAL_URI: "mongodb://127.0.0.1:27017/hotel-booking",
        db_URI: "",
        API_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "AMANKUMARGUPTAISAMECHANICALENGINEERFROMIMSENGINEERINGCOLLEGE",
        NEXTAUTH_URL: "http://localhost:3000",
        CLOUDINARY_CLOUD_NAME: "dbrd2j2lo",
        CLOUDINARY_API_KEY: "544732963741955",
        CLOUDINARY_API_SECRET: "LlkrKhmuE2klXfqTwmDXDblZvWo"
    },
    images: {
        domains: ["res.cloudinary.com"]
    }
}

module.exports = nextConfig
