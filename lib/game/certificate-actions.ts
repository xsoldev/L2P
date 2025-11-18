// Certificate download and sharing utilities

import { toast } from 'sonner';

/**
 * Download certificate as PNG image
 */
export async function downloadCertificate(
  certificateElement: HTMLElement,
  userName: string,
  language: 'en' | 'fr'
): Promise<void> {
  try {
    if (!certificateElement) {
      toast.error(language === 'fr' ? 'Certificat introuvable. Veuillez réessayer.' : 'Certificate not found. Please try again.');
      return;
    }

    // Use dom-to-image to convert certificate to PNG
    const domtoimage = (await import('dom-to-image-more')).default;

    // Convert to blob with filter to remove decorative borders
    const blob = await domtoimage.toBlob(certificateElement, {
      width: certificateElement.offsetWidth * 2,
      height: certificateElement.offsetHeight * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
        width: certificateElement.offsetWidth + 'px',
        height: certificateElement.offsetHeight + 'px',
        border: 'none',
        boxShadow: 'none'
      },
      filter: (node: any) => {
        // Remove corner accent decorations
        if (node.classList && node.classList.contains('absolute')) {
          const style = window.getComputedStyle(node);
          if (style.border && style.border !== 'none') {
            return false;
          }
        }
        return true;
      }
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const nameForFile = userName ? userName.replace(/\s+/g, '-') : 'certificate';
    link.download = `prompt-engineering-certificate-${nameForFile}-${Date.now()}.png`;
    link.href = url;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  } catch (error: any) {
    console.error('Error generating certificate:', error);
    toast.error(language === 'fr' ? `Échec du téléchargement : ${error.message}` : `Failed to download certificate: ${error.message}`);
  }
}

/**
 * Copy text to clipboard
 */
export function copyToClipboard(text: string, language: 'en' | 'fr'): void {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(language === 'fr' ? 'Texte copié dans le presse-papier !' : 'Share text copied to clipboard!');
  }).catch(() => {
    toast.error(language === 'fr' ? 'Échec de la copie. Veuillez réessayer.' : 'Failed to copy. Please try again.');
  });
}

/**
 * Share certificate using Web Share API or fallback to clipboard
 */
export async function shareCertificate(score: number, language: 'en' | 'fr'): Promise<void> {
  const shareText = `I just completed the AI Prompt Engineering course and scored ${score} points! 🎓✨\n\nLearn prompt engineering for free at learn2prompt.xyz`;
  const shareUrl = 'https://learn2prompt.xyz';

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'AI Prompt Engineering Certificate',
        text: shareText,
        url: shareUrl,
      });
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        copyToClipboard(shareText + '\n' + shareUrl, language);
      }
    }
  } else {
    copyToClipboard(shareText + '\n' + shareUrl, language);
  }
}

/**
 * Share to Twitter
 */
export function shareToTwitter(score: number): void {
  const text = `I just completed the AI Prompt Engineering course and scored ${score} points! 🎓✨\n\nTry it yourself at learn2prompt.xyz`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'width=600,height=400');
}

/**
 * Share to LinkedIn
 */
export function shareToLinkedIn(): void {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://learn2prompt.xyz')}`;
  window.open(url, '_blank', 'width=600,height=400');
}
