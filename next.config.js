/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_LOCAL_URI: "mongodb://127.0.0.1:27017/hotel-booking",
        db_URI: "mongodb+srv://hotelbooking:hotelbooking123@cluster0.gqdumua.mongodb.net/hotel-booking?retryWrites=true&w=majority",
        API_URL: "https://hotelbooker.netlify.app",
        NEXTAUTH_SECRET: "AMANKUMARGUPTAISAMECHANICALENGINEERFROMIMSENGINEERINGCOLLEGE",
        NEXTAUTH_URL: "https://hotelbooker.netlify.app",
        CLOUDINARY_CLOUD_NAME: "dbrd2j2lo",
        CLOUDINARY_API_KEY: "544732963741955",
        CLOUDINARY_API_SECRET: "LlkrKhmuE2klXfqTwmDXDblZvWo",
        EMAIL_HOST: "sandbox.smtp.mailtrap.io",
        EMAIL_PORT: 2525,
        EMAIL_USER: "a760c3232aeaf2",
        EMAIL_PASSWORD: "17c7787b179b67",
        EMAIL_FROM_EMAIL: "noreply@bookhotels.com",
        EMAIL_FROM_NAME: "BOOK HOTELS",
        STRIPE_SECRET_KEY: "sk_test_51OgmFRSD4Cc8c1pOsFfMzC7gNNCPd3JQfWffb7tBQFGbni6Yh3vzfIqeBaDYGXOdaNgzHeKykc1ctZ6nNvhqiCzn00ejXvU6Vj",
        STRIPE_WEBHOOKS_SECRET: "whsec_c963ca81a633be477cc1f663214c37c043cd7e5133a31a7755f54677c1c2bf97",
        REVALIDATE_TOKEN: "AMANKUMARGUPTAMECHANICALENGINEER27121998"
    },
    images: {
        domains: ["res.cloudinary.com"]
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      typescript: {
          // !! WARN !!
          // Dangerously allow production builds to successfully complete even if
          // your project has type errors.
          // !! WARN !!
          ignoreBuildErrors: true,
        },
}

module.exports = nextConfig
