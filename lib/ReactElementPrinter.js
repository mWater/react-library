"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const jquery_1 = __importDefault(require("jquery"));
const react_dom_1 = __importDefault(require("react-dom"));
/** Prints a React element. Requires font-awesome for spinner and jquery */
class ReactElementPrinter {
    /**
     * delay: ms to wait before printing to allow elements to render
     * text: text to display next to spinner
     */
    print(element, options) {
        return new Promise((resolve, reject) => {
            // Add special CSS printing rules
            const extraCss = (0, jquery_1.default)(`\
  <style id="react_element_printer_css">
    @media print {
      /* Hide body and get rid of margins */
      body {
        visibility: hidden;
        margin: 0;
        padding: 0;
        opacity: 100%
      }

      /* Hide all children of body */
      body > * {
        display: none;
      }

      /* Setup special region */
      #react_element_printer {
        display: block !important;
        visibility: visible;
      }
    }

    @media screen {
      /* REMOVED: Don't show when not printing. Caused c3 problems */
      /*#react_element_printer {
        visibility: hidden;
      }*/
    }

    /* Default to letter sized pages */
    @page  {
      size: 8.5in 11in; 
      margin: 0.5in 0.5in 0.5in 0.5in; 
    }

    #react_element_printer_splash {
      display: flex; 
      align-items: center;
      justify-content: center;    
      position: fixed; 
      left: 0;
      top: 0;
      z-index: 9999;
      width: 100%;
      height: 100%;
      overflow: visible;    
      background-color: rgba(255,255,255,0.7);
    }

    @media print {
      #react_element_printer_splash {
        display: none;
      }
    }

  </style>\
  `);
            (0, jquery_1.default)("body").append(extraCss);
            // Add special region to body
            (0, jquery_1.default)("body").append('<div id="react_element_printer"></div>');
            // Add warning that printing
            (0, jquery_1.default)("body").append(`\
  <div id="react_element_printer_splash">
    <div style="font-size: 30pt;">
      <i class="fa fa-spinner fa-spin"></i>\
  ` +
                (options.text || "") +
                `\
    </div>
  </div>\
  `);
            // Render element into special region
            react_dom_1.default.render(element, (0, jquery_1.default)("#react_element_printer").get(0), () => {
                // Wait for element to render
                lodash_1.default.delay(() => {
                    // Call print
                    window.print();
                    // Unmount component
                    react_dom_1.default.unmountComponentAtNode((0, jquery_1.default)("#react_element_printer").get(0));
                    // Remove rest of nodes
                    (0, jquery_1.default)("#react_element_printer").remove();
                    (0, jquery_1.default)("#react_element_printer_css").remove();
                    (0, jquery_1.default)("#react_element_printer_splash").remove();
                    resolve();
                }, options.delay || 1000);
            });
        });
    }
}
exports.default = ReactElementPrinter;
