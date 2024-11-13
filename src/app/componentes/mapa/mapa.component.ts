import {Component, HostListener, inject, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ApiCoctelesService} from '../../service/api-cocteles.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {

  private map!: L.Map;
  router= inject(Router);

  // Lista de cócteles por país
  private cocktailsByCountry: { [key: string]: { name: string, lat: number, lon: number }[] } = {
    argentina: [
      { name: 'Ipamena', lat: -38.4161, lon: -63.6167 },
      { name: 'Mimosa', lat: -34.6037, lon: -58.3816 },
      { name: 'Cocktail Horse’s Neck', lat:  -34.9206, lon: -57.9536 },
      { name: 'Pina Colada', lat: -38.0035, lon: -57.5556 },
      { name: 'Pysch Vitamin Light', lat: -37.3201, lon: -59.1289 },
      { name: 'City Slicker', lat: -38.7193, lon: -60.2045 },
      { name: 'The Evil Blue Thing', lat: -35.7527, lon: -60.4522 },
      { name: 'Flaming Lamborghini', lat: -36.8843, lon: -59.9300 },
      { name: 'Rum Punch', lat: -34.5881, lon: -60.9490 },
      { name: 'Citrus Coke', lat: -33.8924, lon: -60.5772 },
      { name: 'Cocktail Horse’s Neck', lat: -34.6547, lon: -59.5686 },
      { name: 'Strawberry Daiquiri', lat: -35.5608, lon: -60.0447 },
    ],
    us: [
      { name: 'Creme de Menthe', lat: 34.0522, lon: -118.2437 },
      { name: 'Scotch Cobbler', lat: 41.85003, lon: -87.65005 },
      { name: 'New York Lemonade', lat: 40.7128, lon: -74.0060 },
      { name: 'Happy Skipper', lat: 29.76328, lon: -95.36327},
      { name: 'Orange Scented Hot Chocolate', lat: 33.44838, lon: -112.07404},
      { name: 'Frozen Mint Daiquiri', lat: 39.95238, lon: -75.16362},
      { name: 'Vodka And Tonic', lat: 29.42412, lon: -98.49363},
      { name: 'Irish Coffee', lat: 32.71571, lon: -117.16472},
    ],
    mx:[
      { name: 'Paloma', lat: 19.42847, lon: -99.12766 },
      { name: 'Vampiro', lat: 32.5027, lon: -117.00371 },
      { name: 'Strawberry Margarita', lat: 19.35529, lon: -99.06224},
      { name: 'Tommy\'s Margarita', lat: 19.03793, lon: -98.20346},
      { name: 'Long Island Iced Tea', lat: 31.72024, lon: -106.46084},
      { name: 'Moranguito', lat: 20.66682, lon: -103.39182},
      { name: 'Pineapple Paloma', lat: 20.97537, lon: -89.61696},
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
            <br><button id="ir-${drink.strDrink}" >¡Disfrútalo!</button>
          `);
        marker.on('popupopen', () => {
          const button = document.getElementById(`ir-${drink.strDrink}`);
          if (button) {
            button.addEventListener('click', () => this.navigateToDrink(drink.strDrink));
          }
        });


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

  navigateToDrink(drinkName: string) {
    this.router.navigate(['/coctel', drinkName]);
  }



}

