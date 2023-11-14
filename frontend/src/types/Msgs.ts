export interface Msg { }

export interface PaintMsg extends Msg {
  paint: {
    color: string,
    position: string,
  }
}