function initMap() {
    const center = {lat: 89.6185, lng: 39.7301};
    map = new google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 8
  })

  const pin = new google.maps.Marker({
      position: center,
      map
  })
}