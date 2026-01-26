/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563eb', // Royal Blue
                    hover: '#1d4ed8',
                },
                secondary: '#64748b', // Slate Grey
                success: '#10b981', // Emerald
                error: '#ef4444', // Red
                background: '#f1f5f9', // Slate 100
                surface: '#ffffff',
            },
            fontFamily: {
                sans: ['Poppins', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
