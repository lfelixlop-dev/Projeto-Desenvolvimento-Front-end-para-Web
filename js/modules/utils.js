// Escapa texto vindo do usuário/localStorage antes de colocá-lo em template literals.
export function escapeHtml(texto = '') {
  return String(texto).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
