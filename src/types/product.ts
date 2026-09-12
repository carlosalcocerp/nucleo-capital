export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  tipo: string;
  stock: number;
  activo: boolean;
  fechaCreacion: Date;
  moq: number;
  tecnica: string;
  colores: string[];
  material: string;
  capacidad?: string;
  badge?: string;
}
