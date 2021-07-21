import React from "react";
export default class TestComponent {
    div: any;
    comp: any;
    constructor(elem: any);
    setElement(elem: any): Element;
    getComponent(): any;
    destroy(): boolean;
    findDOMNodesByText(pattern: any): any;
    findDOMNodeByText(pattern: any): any;
    findComponentByText(pattern: any): any;
    findInput(): Element;
    findComponentById(id: any): React.ReactInstance;
    static click(comp: any): void;
    static pressEnter(comp: any): void;
    static pressTab(comp: any): void;
    static changeValue(comp: any, value: any): void;
}
