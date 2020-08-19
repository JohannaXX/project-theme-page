function initMap() {
    const center = { lat: 39.729021 , lng: -89.617654 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center
    })
    
    const pin = new google.maps.Marker({
        position: center,
        map
    })
}

  