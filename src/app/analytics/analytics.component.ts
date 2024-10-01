import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements AfterViewInit{
  root: any;

  // Datos ficticios
  users = [
    { name: 'John Doe', countryCode: 'US' },
    { name: 'Jane Smith', countryCode: 'CA' },
    { name: 'Carlos López', countryCode: 'MX' },
    { name: 'Marie Curie', countryCode: 'FR' },
    { name: 'Yuki Tanaka', countryCode: 'JP' },
    { name: 'Pedro Pérez', countryCode: 'EC' },
    { name: 'Ana Gómez', countryCode: 'EC' },
    { name: 'Luis Fernández', countryCode: 'EC' },
    { name: 'Sofia Martínez', countryCode: 'EC' },
    { name: 'Fernando Torres', countryCode: 'EC' },
    { name: 'Elena Morales', countryCode: 'EC' },
    { name: 'Diego Ríos', countryCode: 'EC' },
    { name: 'Lucía Jiménez', countryCode: 'EC' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    // Verificar si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Crear el mapa con los datos inventados
      const countryCodes = this.users.map(user => user.countryCode);
      this.createMap(countryCodes);
    }
  }

  createMap(countryCodes: string[]) {
    // Crear el root del gráfico
    this.root = am5.Root.new("chartdiv");

    // Crear el mapa
    let chart = this.root.container.children.push(am5map.MapChart.new(this.root, {
      projection: am5map.geoMercator()
    }));

    // Cargar los datos geográficos
    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(this.root, {
      geoJSON: am5geodata_worldLow
    }));

    // Configurar los países por defecto
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0xA9A9A9) // Color por defecto
    });

    // Cambiar color al pasar el mouse
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677E52)
    });

    // Pintar países específicos con los datos inventados
    this.highlightCountries(polygonSeries, countryCodes);
  }

  highlightCountries(series: any, countryCodes: string[]) {
    // Contar usuarios de Ecuador
    const ecuadorUserCount = this.users.filter(user => user.countryCode === 'EC').length;
    console.log(ecuadorUserCount);

    series.mapPolygons.each((polygon: any) => {
      // Verificar si el país es Ecuador
      if (polygon.dataItem.dataContext.id === 'EC') {
        // Pintar Ecuador de rojo si hay más de 10 usuarios
        if (ecuadorUserCount > 5) {
          polygon.set("fill", am5.color(0x677E52)); // Pintar de rojo
        }else{
          polygon.set("fill", am5.color(0xA9A9A9)); // Volver a gris si hay 10 o menos
        }
        // Actualizar el tooltip con la cantidad de usuarios
        polygon.set("tooltipText", `Ecuador: ${ecuadorUserCount} usuarios`);
      } else if (countryCodes.includes(polygon.dataItem.dataContext.id)) {
        polygon.set("fill", am5.color(0xFF0000)); // Pintar otros países inventados de rojo
      }
    });
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }


  isSidebarCollapsed = false;
   onSidebarCollapseChanged(isActive: boolean){
    this.isSidebarCollapsed = isActive;
   }

}

