# App Assets Guide

This guide explains how to add custom app icons and splash screens for the Learn2Prompt Android app.

## App Icon

The app icon is currently using the default Capacitor icon. To customize it:

### Option 1: Using Capacitor Assets Generator (Recommended)

1. **Install the generator:**
   ```bash
   npm install -g @capacitor/assets
   ```

2. **Create source icon:**
   - Create a 1024x1024px PNG file named `icon.png`
   - Place it in the `resources/` directory (create if needed)
   - Design should have:
     - Centered content within safe zone (900x900px)
     - No text that needs to be readable at small sizes
     - High contrast colors
     - Simple, recognizable design

3. **Generate all icon sizes:**
   ```bash
   npx capacitor-assets generate --iconBackgroundColor '#0D0D0D' --iconBackgroundColorDark '#0D0D0D'
   ```

   This will automatically generate:
   - All required Android icon sizes (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
   - Adaptive icon layers for Android 8.0+
   - Different variants for light/dark mode if needed

### Option 2: Manual Icon Creation

If you prefer manual control, create icons for each density:

**Android Icon Sizes:**
- mdpi: 48x48px
- hdpi: 72x72px
- xhdpi: 96x96px
- xxhdpi: 144x144px
- xxxhdpi: 192x192px

Place these in corresponding directories:
```
android/app/src/main/res/
  ├── mipmap-mdpi/ic_launcher.png (48x48)
  ├── mipmap-hdpi/ic_launcher.png (72x72)
  ├── mipmap-xhdpi/ic_launcher.png (96x96)
  ├── mipmap-xxhdpi/ic_launcher.png (144x144)
  └── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

## Splash Screen

The splash screen shows while the app is loading.

### Option 1: Using Capacitor Assets Generator (Recommended)

1. **Create source splash:**
   - Create a 2732x2732px PNG file named `splash.png`
   - Place it in the `resources/` directory
   - Design guidelines:
     - Keep important content in center 1600x1600px area
     - Use app brand colors
     - Can include logo or app name
     - Background should match app theme (#0D0D0D)

2. **Generate splash screens:**
   ```bash
   npx capacitor-assets generate
   ```

   This generates all required splash screen sizes for different screen densities and orientations.

### Option 2: Manual Splash Screen Creation

**Android Splash Screen Sizes:**

Portrait:
- mdpi: 320x480px
- hdpi: 480x800px
- xhdpi: 720x1280px
- xxhdpi: 1080x1920px
- xxxhdpi: 1440x2560px

Landscape:
- mdpi: 480x320px
- hdpi: 800x480px
- xhdpi: 1280x720px
- xxhdpi: 1920x1080px
- xxxhdpi: 2560x1440px

Place these in:
```
android/app/src/main/res/
  ├── drawable-port-mdpi/splash.png
  ├── drawable-port-hdpi/splash.png
  ├── drawable-port-xhdpi/splash.png
  ├── drawable-port-xxhdpi/splash.png
  ├── drawable-port-xxxhdpi/splash.png
  ├── drawable-land-mdpi/splash.png
  ├── drawable-land-hdpi/splash.png
  ├── drawable-land-xhdpi/splash.png
  ├── drawable-land-xxhdpi/splash.png
  └── drawable-land-xxxhdpi/splash.png
```

## Splash Screen Configuration

The splash screen behavior is configured in `capacitor.config.ts`:

```typescript
{
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,        // Duration in ms
      backgroundColor: "#0D0D0D",       // Match app background
      showSpinner: false,               // Hide loading spinner
      androidScaleType: "CENTER_CROP",  // How image is scaled
      splashFullScreen: true,           // Full screen splash
      splashImmersive: true             // Immersive mode
    }
  }
}
```

### Adjustable Options:

- `launchShowDuration`: How long splash shows (milliseconds)
- `backgroundColor`: Background color (hex)
- `showSpinner`: Show loading indicator (boolean)
- `androidScaleType`:
  - `CENTER_CROP` - Scale to fill, crop if needed
  - `CENTER` - Center without scaling
  - `FIT_CENTER` - Scale to fit, maintain aspect ratio

## Design Recommendations

### App Icon
- **Simple & Bold**: Recognizable at small sizes
- **High Contrast**: Stands out on home screen
- **No Text**: Text becomes unreadable at small sizes
- **Unique Color**: Distinct from other apps
- **Professional**: Matches app quality

### Splash Screen
- **Fast Loading**: Keep under 2-3 seconds
- **Brand Consistent**: Matches app theme
- **Simple Design**: Logo or app name centered
- **Dark Background**: Matches app's dark theme (#0D0D0D)
- **No Complex Animations**: Keep it simple

## Testing Your Assets

After adding custom assets:

1. **Sync changes:**
   ```bash
   npx cap sync android
   ```

2. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

3. **Run on emulator/device:**
   - Icons: Check home screen and app drawer
   - Splash: Force quit and reopen app

4. **Test different densities:**
   - Test on devices with different screen sizes
   - Check mdpi, hdpi, xhdpi, xxhdpi devices

## Quick Start with Placeholders

For development, you can use simple placeholder assets:

1. **Create basic icon:**
   - 512x512px PNG with app name or logo
   - Solid background color (#0D0D0D)
   - Center your design

2. **Create basic splash:**
   - 1920x1920px PNG
   - Dark background (#0D0D0D)
   - App name/logo in center
   - Keep text large and readable

3. **Generate all sizes:**
   ```bash
   npm install -g @capacitor/assets
   npx capacitor-assets generate
   ```

## Resources

- [Capacitor Assets Generator](https://github.com/ionic-team/capacitor-assets)
- [Android Icon Guidelines](https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher)
- [Android Splash Screen Guide](https://developer.android.com/develop/ui/views/launch/splash-screen)
- [Material Design Icons](https://material.io/design/iconography/product-icons.html)

## Current Status

- ✅ Capacitor configured for splash screen
- ✅ Android resource directories created
- ⏳ Custom app icon (using defaults)
- ⏳ Custom splash screen (using defaults)

**Next Steps:**
1. Design custom app icon (1024x1024px)
2. Design custom splash screen (2732x2732px)
3. Run `npx capacitor-assets generate`
4. Test on Android device/emulator
