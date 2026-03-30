/**
 * Input Sanitization Utilities
 * 
 * Prevents XSS attacks by sanitizing user input before rendering.
 */

/**
 * Escape HTML special characters to prevent XSS
 */
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Strip all HTML tags from a string
 */
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

/**
 * Sanitize text for safe display (removes HTML and escapes special chars)
 */
export const sanitizeText = (text: string): string => {
  return escapeHtml(stripHtml(text));
};

/**
 * Truncate text to a maximum length
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Sanitize and truncate text
 */
export const sanitizeAndTruncate = (text: string, maxLength: number): string => {
  return truncate(sanitizeText(text), maxLength);
};
