// CONTACT FORM
export function handleContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form) return; // safety check

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Thanks for your message! I’ll be in touch soon.";
        form.reset();
      } else {
        status.textContent = "Sorry! There was a problem sending your message.";
      }
    } catch (error) {
      status.textContent = "Network error. Please try again later.";
    }
  });
}

// MAP //
export function initDarkMap(mapElementId = "map", lat = -39.4928, lng = 176.9120, zoom = 12) {
  if (!document.getElementById(mapElementId)) return; // safety check

  const map = new google.maps.Map(document.getElementById(mapElementId), {
    center: { lat, lng },
    zoom: zoom,
    styles: [
      { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
      { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
      { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
      { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{ "color": "#757575" }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#383838" }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#000000" }]
      }
    ]
  });
}
