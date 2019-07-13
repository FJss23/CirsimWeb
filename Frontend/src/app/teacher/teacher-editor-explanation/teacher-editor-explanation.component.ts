import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-teacher-editor-explanation',
  templateUrl: './teacher-editor-explanation.component.html',
  styleUrls: ['./teacher-editor-explanation.component.css']
})
export class TeacherEditorExplanationComponent implements OnInit {
  private _transformer = (node: ManualNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<DataNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {

  }

  hasChild = (_: number, node: DataNode) => node.expandable;
}

const TREE_DATA: ManualNode[] = [
  {
    name: 'Instrucciones de uso',
    children: [{
      name: 'Puntos',
      children: [
        {name: 'Este modo permite añadir puntos haciendo click sobre el lienzo.'},
        {name: '* Para cambiar el color, seleccionar uno en la paleta de colores y luego añadir el punto.'},
        {name: '* Para cambiar el nombre, añadir uno en la entrada Etiqueta punto y luego añadir el punto.'},
        {name: '* Para cambiar el tamaño, seleccionar un tamaño en la barra Tamaño punto y luego añadir el punto.'}
      ]
    },
    {
      name:'Conexiones',
      children: [
        {name: 'Este modo permite añadir conexiones manteniendo pulsado el ratón sobre un punto y arrastrando hasta otro punto.'},
        {name: '* Para cambiar el color, seleccionar uno en la paleta de colores y luego añadir la conexión.'},
        {name: '* Para cambiar el tamaño,seleccionar un tamaño en la barra Tamaño conexión y luego añadir la conexión.'},
      ]
    },
    {
      name:'Editar',
      children: [
        {name: 'Este modo permite cambiar las características de puntos/conexiones añadidas, además de la posición de los puntos.'},
        {name: '* Para cambiar la posición de un punto, hacer click y mantener pulsado hasta arrastrar el punto a una nueva posición'},
        {name: '* Para cambiar el color, tamaño o nombre de un punto, hacer click sobre el punto, realizar los cambios y pulsar Aplicar cambios.'},
        {name: '* Para cambiar el color o tamaño de una conexión, hacer click sobre la conexión, realizar los cambios y pulsar Aplicar cambios.'},
      ]
    },
    {
      name:'Borrar',
      children: [
        {name: 'Este modo permite eliminar un punto/conexión haciendo click sobre el punto/conexión.'},
      ]
    }]
}];
