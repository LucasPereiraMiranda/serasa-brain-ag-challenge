import { cnpj, cpf } from 'cpf-cnpj-validator';

export function isValidDocument(document: string): boolean {
  const validators = {
    11: cpf.isValid,
    14: cnpj.isValid,
  };

  return validators[document.length]?.(document) ?? false;
}
