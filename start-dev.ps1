# Set environment variables
$env:SKIP_PRISMA_GENERATE='true'
$env:NEXTAUTH_URL='http://localhost:3500'
$env:NEXTAUTH_SECRET='this_is_a_secure_secret_key_for_development_do_not_use_in_production'
$env:DEBUG='next-auth:*'
$env:DATABASE_URL='mongodb+srv://finaleewa:finaleewa@finaleewa.7eytc2o.mongodb.net/finaleewa?retryWrites=true&w=majority&appName=finaleewa'
$env:NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME='dzwkeydij'
$env:CLOUDINARY_URL='cloudinary://261241242864329:KS0GJUBWc5m5gyMXLC2yPPozVuA@dzwkeydij'
$env:NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET='airbnb_upload'
$env:CLOUDINARY_API_KEY='261241242864329'
$env:CLOUDINARY_API_SECRET='KS0GJUBWc5m5gyMXLC2yPPozVuA'
$env:NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN='pk.eyJ1IjoiZXdhYWhvbWUiLCJhIjoiY204ZGpranNkMWs4cTJtczU0dmwxaXlpdiJ9.0xFsZgp69DtYp5iwQh9Ivw'
$env:NEXT_PUBLIC_MAPBOX_STYLE='mapbox://styles/mapbox/streets-v11'

# Start the Next.js development server
npx next dev -p 3500