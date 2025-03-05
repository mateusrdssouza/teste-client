export interface Client {
  recnum: number;
  empresa: number;
  codigo: number;
  razao_social: string;
  tipo: "PJ" | "PF";
  cpf_cnpj: string;
}
