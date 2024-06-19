export const applyCnpjCpfMask = (value: string, type: string): string => {
    if (type === "pessoa_fisica") {
      return value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d{1,2})/, '$1-$2') 
        .replace(/(-\d{2})\d+?$/, '$1');
    } else if (type === "pessoa_juridica") {
      return value
        .replace(/\D/g, '') 
        .replace(/(\d{2})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1/$2') 
        .replace(/(\d{4})(\d{1,2})/, '$1-$2') 
        .replace(/(-\d{2})\d+?$/, '$1'); 
    }
    return value;
  };
  
  export const applyPhoneMask = (value: string, type: string): string => {
    if (type === 'telephone') {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{4})/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1'); 
    } else if (type === 'cellphone') {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1'); 
    }
    return value;
  };
  