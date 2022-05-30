import { ReactElement } from "react";
/** Prints a React element. Requires font-awesome for spinner and jquery */
export default class ReactElementPrinter {
    /**
     * delay: ms to wait before printing to allow elements to render
     * text: text to display next to spinner
     */
    print(element: ReactElement, options: {
        delay?: number;
        text?: string;
    }): Promise<void>;
}
