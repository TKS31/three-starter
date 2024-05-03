export type Props = {
  [key: string]: any;
}

export default class Component<T extends Element> {
  el: T;
  props: Props;
  refs: { [key: string]: any };
  
  constructor(el: string | T, props: Props = {}) {
    this.el = (typeof el === 'string') ? document.querySelector<T>(el)! : el;
    this.props = props;
    this.refs = {};
  }
}