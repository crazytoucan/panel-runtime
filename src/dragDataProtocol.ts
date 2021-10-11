function sessionDragType(sessionId: string) {
  return `application/x-panel-runtime-sessionId::${sessionId}`;
}

export function isSessionDrag(dataTransfer: DataTransfer, sessionId: string) {
  return dataTransfer.types.includes(sessionDragType(sessionId));
}

export function setDragData(dataTransfer: DataTransfer, sessionId: string) {
  dataTransfer.setData(sessionDragType(sessionId), "");
}
