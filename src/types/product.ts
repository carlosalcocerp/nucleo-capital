export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  tipo: string;
  activo: boolean;
  fechaCreacion: Date;
  colores: string[];
  material: string;
  capacidad?: string;
  badge?: string;
}
