export type EstadoAviso = 'activo' | 'reclamado' | 'retirado' | 'vencido';

export type Aviso = {
  id: string;
  titulo: string;
  descripcion: string;
  cantidadKg: number;
  esOrganicoCompostable: boolean;
  ventanaRetiroHoras: number;
  creadoEn: string;
  estado: EstadoAviso;
  benefactorNombre: string;
  ubicacion?: { latitude: number; longitude: number };
};