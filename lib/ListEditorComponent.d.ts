import { ReactNode } from "react";
/** Generic editor for a list of items that shows the items within a Bootstrap 3 list-group.
 * Adding and editing are done via a popup
 */
export declare function ListEditorComponent<T>(props: {
    items: T[];
    onItemsChange: (items: T[]) => void;
    /** Render the item in the list. Already inside a list-group-item */
    renderItem: (item: T, index: number) => ReactNode;
    /** Render the editor in the popup modal */
    renderEditor: (item: Partial<T>, onItemChange: (item: Partial<T>) => void) => ReactNode;
    /** Create a new item. Doesn't allow add if not present */
    createNew?: () => Partial<T>;
    /** Validate an item. True for valid */
    validateItem: (item: Partial<T>) => boolean;
    /** Override label of add button */
    addLabel?: string;
    /** Prompt to confirm deletion */
    deleteConfirmPrompt?: string;
}): JSX.Element;
