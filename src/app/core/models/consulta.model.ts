export interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
}

export interface Consulta {
  id: number;
  animal: Animal;
  data_consulta: string;
  motivo: string;
  observacoes: string | null;
}

export interface ConsultaRequest {
  animal_id: number;
  data_consulta: string;
  motivo: string;
  observacoes?: string;
}
