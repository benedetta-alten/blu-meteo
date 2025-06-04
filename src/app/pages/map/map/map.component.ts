import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule, FormsModule] 
})

export class MapComponent implements AfterViewInit {
  private map: any;
  private marker: any;
  private myIcon: any;
  private L: any;

  selectedCityWeather: any = null;
  loadingWeather = false; 
  isLoggedIn = false;
  showWind = false;
  showWeatherCode = false;

  cities = [
    { name: 'Lisbona', lat: 38.7169, lng: -9.1399 },
    { name: 'Madrid', lat: 40.4168, lng: -3.7038 },
    { name: 'Parigi', lat: 48.8566, lng: 2.3522 },
    { name: 'Bruxelles', lat: 50.8503, lng: 4.3517 },
    { name: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
    { name: 'Lussenburgo', lat: 49.6117, lng: 6.1319 },
    { name: 'Nicosia', lat: 35.1856, lng: 33.3823 },
    { name: 'Roma', lat: 41.9028, lng: 12.4964 },
    { name: 'La Valletta', lat: 35.8997, lng: 14.5146 },
    { name: 'Vienna', lat: 48.2082, lng: 16.3738 },
    { name: 'Berlino', lat: 52.52, lng: 13.4050 },
    { name: 'Varsavia', lat: 52.2297, lng: 21.0122 },
    { name: 'Copenaghen', lat: 55.6761, lng: 12.5683 },
    { name: 'Stoccolma', lat: 59.3293, lng: 18.0686 },
    { name: 'Riga', lat: 56.9496, lng: 24.1052 },
    { name: 'Vilnius', lat: 54.6872, lng: 25.2797 },
    { name: 'Tallinn', lat: 59.437, lng: 24.7536 },
    { name: 'Londra', lat: 51.5074, lng: -0.1278 },
    { name: 'Dublino', lat: 53.3498, lng: -6.2603 },
    { name: 'Bucarest', lat: 44.4268, lng: 26.1025 },
    { name: 'Atene', lat: 37.9838, lng: 23.7275 },
    { name: 'Zagabria', lat: 45.815, lng: 15.9819 },
    { name: 'Lubiana', lat: 46.0569, lng: 14.5058 },
    { name: 'Budapest', lat: 47.4979, lng: 19.0402 },
    { name: 'Praga', lat: 50.0755, lng: 14.4378 },
    { name: 'Bratislava', lat: 48.1486, lng: 17.1077 },
    { name: 'Helsinki', lat: 60.1695, lng: 24.9354 },
    { name: 'Sofia', lat: 42.6977, lng: 23.3219 }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient, private authService: AuthService
  ) {
    this.cities.sort((a, b) => a.name.localeCompare(b.name));
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  async ngAfterViewInit(): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
    const L = await import('leaflet');
    this.L = L;
    this.map = L.map('map').setView([45.4642, 9.1900], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.myIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    this.marker = L.marker([45.4642, 9.1900], { icon: this.myIcon }).addTo(this.map);
  
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      this.marker = this.L.marker([lat, lng], { icon: this.myIcon }).addTo(this.map);

      this.fetchWeather(lat, lng).subscribe(
          (data) => {
            this.selectedCityWeather = data;
            const popupContent = this.createPopupContent(data);
            this.marker.bindPopup(popupContent).openPopup();
          },
          (error) => {
            console.error('Errore nel fetch meteo', error);
            this.marker.bindPopup('Impossibile caricare i dati meteo').openPopup();
          }
        );
    });
  }
}

    
  selectCity(city: { name: string; lat: number; lng: number }) {
    if (!this.map || !this.L) return;

    this.map.setView([city.lat, city.lng], 6);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = this.L.marker([city.lat, city.lng], {
      icon: this.myIcon,
    }).addTo(this.map);

    this.fetchWeather(city.lat, city.lng).subscribe(
      (data) => {
        this.selectedCityWeather = data;
        const popupContent = this.createPopupContent(data);
        this.marker.bindPopup(popupContent).openPopup();
      },
      (error) => {
        console.error('Errore nel fetch meteo', error);
        this.marker.bindPopup('Impossibile caricare i dati meteo').openPopup();
      }
    );
  }

  fetchWeather(lat: number, lng: number): Observable<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation&current_weather=true&timezone=Europe%2FBerlin`;
    return this.http.get<any>(url);
  }

  createPopupContent(data: any): string {
    if (!data || !data.current_weather) return 'Nessun dato meteo disponibile';

    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const weatherCode = data.current_weather.weathercode;

    let content = `<div><strong>Meteo attuale:</strong><br/>Temperatura: ${temp} °C`;

    if (this.isLoggedIn) {
      if (this.showWind) {
        content += `<br/>Velocità vento: ${wind} km/h`;
      }
      if (this.showWeatherCode) {
        content += `<br/>Codice meteo: ${weatherCode}`;
      }
    }

    content += '</div>';
    return content;
  }
}