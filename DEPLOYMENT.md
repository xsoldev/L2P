# Deployment Guide for Dokploy

## Prerequisites
- Dokploy server set up and running
- Access to Dokploy dashboard
- Your Anthropic API key

## Environment Variables

Set the following environment variable in your Dokploy application settings:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## Deployment Steps

### 1. Build the Application

The application will automatically build on Dokploy using:
```bash
npm run build
```

### 2. Start Command

Dokploy will use the following command to start the application:
```bash
npm start
```

### 3. Port Configuration

The application runs on port **3000** by default (Next.js default).

Make sure your Dokploy configuration matches this port.

## Post-Deployment Checklist

- [ ] Verify the application loads at your domain
- [ ] Test the main game flow (complete an exercise)
- [ ] Check the certificate preview at `/certificate`
- [ ] Verify AI responses are working correctly
- [ ] Test Easy Mode prompt suggestions
- [ ] Ensure analytics data loads on Exercise 7

## Features Overview

### Main Features
- 7 interactive prompt engineering exercises
- Real-time AI streaming responses
- Dynamic certificate with animated orbs (12 unique shapes)
- Score tracking and progression system
- Easy Mode with prompt suggestions (1/10 points penalty)

### API Endpoints
- `/api/messages` - AI streaming chat endpoint
- `/api/generate-analytics` - Business analytics data for Exercise 7

### Special Routes
- `/` - Main game interface
- `/certificate` - Certificate preview page

## Troubleshooting

### Issue: API Key Not Working
- Ensure `ANTHROPIC_API_KEY` is set in Dokploy environment variables
- Check that the key has proper permissions

### Issue: Build Fails
- Verify all dependencies are installed
- Check Node.js version (should be 18+ or 20+)
- Review build logs in Dokploy dashboard

### Issue: Certificate Not Displaying
- Clear browser cache
- Check for JavaScript errors in console
- Verify framer-motion and other dependencies loaded correctly

## Technical Stack

- **Framework**: Next.js 16.0.0 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **AI SDK**: Vercel AI SDK v5 + Anthropic SDK
- **Icons**: Lucide React
- **Charts**: Recharts (for analytics visualization)

## Build Configuration

The application uses:
- Turbopack for development (Next.js 16)
- Static optimization where possible
- Server-side rendering for dynamic routes

## Performance Notes

- Certificate animations use pure CSS and SVG (no heavy libraries)
- AI responses stream for better UX
- Analytics data is pre-generated (no AI calls for faster loading)

## Security Notes

- API key is server-side only (not exposed to client)
- No authentication required (public educational tool)
- CORS configured for API routes

---

**Ready to deploy!** 🚀

Simply push your code to your Git repository and connect it to Dokploy, or upload the project directory directly to your Dokploy instance.
