//declare function require(moduleName: string): string;

import IComponent from "../../contract/IComponent";
import IComponentSize from "../../contract/IComponentSize";
import IParentComponent from "../../contract/IParentComponent";
import IScreenReaderWriter from "../../contract/IScreenReaderWriter";
import style from "./BasicComponent.css"


export default class BasicComponent implements IComponent, IParentComponent {
  protected readonly readerWriter: IScreenReaderWriter;
  protected valueChangedCallbacks: ((component: IParentComponent) => void)[] = [];

  public readonly type: string;
  public name: string;
  public caption: string;
  public size: IComponentSize;
  public props: Map<string, any>;
  

  protected constructor(readerWriter: IScreenReaderWriter, type: string) {
    this.readerWriter = readerWriter;
    this.type = type;
  }

  public addValueChangedListener(callback: (component: IParentComponent) => void): void {
    this.valueChangedCallbacks.push(callback);
  }

  public build(): void {
    const html = this.buildHtml();
    this.readerWriter.addHtml(html);
    this.readerWriter.addListener(
      this.name,
      () => this.valueChangedCallbacks.forEach(callback => callback(this))
    );
  }

  private buildHtml(): string {
    //const aaa = require('./BasicComponent.css')
    const html =
      `<div>` +
        `<style>${style}</style>` +
        `<label for="${this.name}">` +
          `<input type="${this.type}" id="${this.name}" name="${this.name}" placeholder=" " />` +
          `<span class="placeholder">${this.caption}</span>` +
        `</label>` +
      `</div>`;

    return html;
  }

  public writeValue(value: any): void {
    this.readerWriter.setValueByElementName(this.name, value);
    this.valueChangedCallbacks.forEach(callback => callback(this));
  }

  public readValue(): any {
    return this.readerWriter.getValueByElementName(this.name);
  }
}
