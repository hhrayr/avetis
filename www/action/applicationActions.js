export function showModalOverlay(context, payload, done) {
  context.dispatch('SHOW_MODAL_OVERLAY', payload);
  done();
}
