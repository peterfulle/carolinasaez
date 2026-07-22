export const PHOTOS = Array.from(
  { length: 14 },
  (_, i) => `/photos/photo-${String(i + 1).padStart(2, '0')}.jpg`
)
