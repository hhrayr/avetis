export function trackEvent(data) {
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('AvetisGA.send', {
      hitType: 'event',
      eventCategory: data.category,
      eventAction: data.action,
      eventLabel: data.label,
    });
  }
}
