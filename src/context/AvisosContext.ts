import { ReactNode, createContext, createElement, useContext, useState } from 'react';
import { Aviso } from '../types/aviso';

type FormData = Omit<Aviso, 'id' | 'creadoEn' | 'estado'>;

type AvisosContextValue = {
  avisos: Aviso[];
  crearAviso: (data: FormData) => void;
  editarAviso: (id: string, data: FormData) => void;
  eliminarAviso: (id: string) => void;
  avanzarEstado: (id: string) => void;
};

const AvisosContext = createContext<AvisosContextValue | null>(null);

// Datos de ejemplo (Punta Arenas) para que veas algo al abrir la app
const initialAvisos: Aviso[] = [
  {
    id: '1',
    titulo: '100 kg Papas Imperfectas',
    descripcion: 'Lista para retiro!',
    cantidadKg: 100,
    esOrganicoCompostable: true,
    ventanaRetiroHoras: 6,
    creadoEn: new Date().toISOString(),
    estado: 'activo',
    benefactorNombre: 'Frutería Don José',
    ubicacion: { latitude: -53.1638, longitude: -70.9171 },
  },
  {
    id: '2',
    titulo: '50 kg Manzanas/Verduras',
    descripcion: 'Donación confirmada para retiro.',
    cantidadKg: 50,
    esOrganicoCompostable: true,
    ventanaRetiroHoras: 4,
    creadoEn: new Date().toISOString(),
    estado: 'reclamado',
    benefactorNombre: 'Supermercado Central',
    ubicacion: { latitude: -53.1565, longitude: -70.9082 },
  },
];

export function AvisosProvider({ children }: { children: ReactNode }) {
  const [avisos, setAvisos] = useState<Aviso[]>(initialAvisos);

  const crearAviso = (data: FormData) => {
    const nuevo: Aviso = {
      ...data,
      id: Date.now().toString(),
      creadoEn: new Date().toISOString(),
      estado: 'activo',
    };
    setAvisos((prev) => [nuevo, ...prev]);
  };

  const editarAviso = (id: string, data: FormData) => {
    setAvisos((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));
  };

  const eliminarAviso = (id: string) => {
    setAvisos((prev) => prev.filter((a) => a.id !== id));
  };

  // Flujo: activo -> reclamado -> retirado (y "vencido" se podría disparar por tiempo)
  const avanzarEstado = (id: string) => {
    const flujo: Aviso['estado'][] = ['activo', 'reclamado', 'retirado'];
    setAvisos((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const idx = flujo.indexOf(a.estado);
        return { ...a, estado: flujo[Math.min(idx + 1, flujo.length - 1)] };
      })
    );
  };

  return createElement(
    AvisosContext.Provider,
    { value: { avisos, crearAviso, editarAviso, eliminarAviso, avanzarEstado } },
    children
  );
}

export function useAvisos() {
  const ctx = useContext(AvisosContext);
  if (!ctx) throw new Error('useAvisos debe usarse dentro de <AvisosProvider>');
  return ctx;
}