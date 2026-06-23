export function getErrorMessage(error: any): string {
  if (!error) return "Ocorreu um erro desconhecido.";

  if (error.response && error.response.data) {
    const { message, issues } = error.response.data;
    
    // Zod validation errors
    if (message === "Validation error") {
      if (issues && typeof issues === "object") {
        const firstKey = Object.keys(issues)[0];
        if (firstKey && issues[firstKey].length > 0) {
          const issueMessage = issues[firstKey][0];
          const fieldTranslations: Record<string, string> = {
            name: "Nome",
            email: "E-mail",
            password: "Senha",
            confirmPassword: "Confirmar Senha"
          };
          const fieldLabel = fieldTranslations[firstKey] || firstKey;
          return `${fieldLabel}: ${issueMessage}`;
        }
      }
      return "Alguns campos foram preenchidos incorretamente.";
    }

    // Auth errors
    if (message === "Email already registered") return "Este e-mail já está em uso.";
    if (message === "Invalid credentials") return "E-mail ou senha inválidos.";
    if (message === "Unauthorized") return "Sessão expirada ou acesso negado.";
    
    // Upload/PDF errors
    if (message === "Could not extract text from the PDF") return "Não foi possível extrair texto deste PDF.";
    if (message === "PDF file is required") return "Você precisa enviar um arquivo PDF.";
    if (message === "Only PDF files are allowed") return "Apenas arquivos PDF são permitidos.";
    
    if (message === "Internal server error") return "Erro interno no servidor. Tente novamente mais tarde.";

    return message || "Ocorreu um erro ao processar sua requisição.";
  }

  if (error.message === "Network Error") {
    return "Erro de conexão. Verifique se o servidor está online.";
  }

  return error.message || "Ocorreu um erro inesperado.";
}
