export default interface IScreenWriter {
  addNewLine(): void;
  addHtml(html: string): void;
  setValueByElementName(name: string, value: any): void;
  setOptionsByElementName(name: string, options: { key: string; caption: string; }[], defaultSelectedKey?: string): void;
}
