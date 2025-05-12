export class CreateFuncionarioDto {
    nome!: string;
    pis?: string;
    cpf?: string;
    matricula?: string;
    cartao?: string;
  }
  
  export class CreateRegistroPontoDto {
    funcionarioId!: number;
    data!: string;
    metodo!: string;
    latitude?: string;
    longitude?: string;
  }
  