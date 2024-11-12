import {Component, HostListener, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ApiCoctelesService} from '../../service/api-cocteles.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {

  private map!: L.Map;

  // Lista de cócteles por país
  private cocktailsByCountry: { [key: string]: { name: string, lat: number, lon: number }[] } = {
    argentina: [
      { name: 'Margarita', lat: -38.4161, lon: -63.6167 },
      { name: 'Mojito', lat: -34.6037, lon: -58.3816 },
      { name: 'Long Island Tea', lat:  -34.9206, lon: -57.9536 },
      { name: 'Negroni', lat: -38.0035, lon: -57.5556 },
      { name: 'Whiskey Sour', lat: -37.3201, lon: -59.1289 },
      { name: 'Dry Martini', lat: -38.7193, lon: -60.2045 },
      { name: 'Daiquiri', lat: -35.7527, lon: -60.4522 },
      { name: 'Manhattan', lat: -36.8843, lon: -59.9300 },
      { name: 'Moscow Mule', lat: -34.5881, lon: -60.9490 },
      { name: 'After Dinner Cocktail', lat: -33.8924, lon: -60.5772 },
      { name: 'Alaska Cocktail', lat: -34.6547, lon: -59.5686 },
      { name: 'Alabama Slammer', lat: -35.5608, lon: -60.0447 },
    ],
    us: [
      { name: 'Mojito', lat: 34.0522, lon: -118.2437 },
      { name: 'Whiskey Sour', lat: 40.7128, lon: -74.0060 },
    ]
  };

  constructor(private cocktailService: ApiCoctelesService) { }

  ngOnInit(): void {
    this.initMap();
    this.cargaCocteles('argentina'); // cargamos los cocteles para argentina
  }

  // iniciamos el mapa
  private initMap(): void {
    this.map = L.map('map').setView([-34.61315, -58.37723], 3); //le seteamos la vista en arg

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  // cargamos los cocteles de un pais
  cargaCocteles(country: string): void {
    // limpiamos popUps
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Obtener los cócteles para el país seleccionado
    const cocktails = this.cocktailsByCountry[country];
    if (cocktails) {
      cocktails.forEach(cocktail => {
        this.agregarCoctel(cocktail.name, cocktail.lat, cocktail.lon);
      });
    }
  }

  private agregarCoctel(nombre: string, lat: number, lon: number): void {
    this.cocktailService.getCocktailByName(nombre).subscribe(data => {
      if (data.drinks) {
        const drink = data.drinks[0];

        // creamos el popUp
        const cocktailIcon = L.icon({
          iconUrl: drink.strDrinkThumb,
          iconSize: [50, 50],            // Tamaño del ícono
          iconAnchor: [25, 50],          // Punto donde se ancla el ícono
          popupAnchor: [0, -50]          // Posición del popup respecto al ícono
        });

        // agregamos el popUp
        const marker = L.marker([lat, lon], { icon: cocktailIcon })
          .addTo(this.map)
          .bindPopup(`
            <b>${drink.strDrink}</b><br>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="100">
            <br><i>¡Disfrútalo!</i>
          `);
      } else {
        console.error('Cóctel no encontrado:', nombre);
      }
    }, error => {
      console.error('Error al obtener los datos del cóctel:', error);
    });
  }

  // cambiamos el pais en el menu desplegable
  cambiarPais(event: any): void {
    const selectedCountry = event.target.value;
    this.cargaCocteles(selectedCountry);
  }
}

