import React from "react";
import ModalPopupComponent from "./ModalPopupComponent";
export interface ActionCancelModalComponentProps {
    /** Title of modal */
    title?: React.ReactNode;
    /** Action button. Defaults to "Save" */
    actionLabel?: React.ReactNode;
    /** Cancel button. Defaults to "Cancel" if action, "Close" otherwise */
    cancelLabel?: React.ReactNode;
    /** Label of delete button. Default "Delete" */
    deleteLabel?: React.ReactNode;
    /** Called when action button is clicked */
    onAction?: () => void;
    /** Called when cancel is clicked */
    onCancel?: () => void;
    /** Big red destuctive action in footer. Not present if null */
    onDelete?: () => void;
    /** "large" for large, "full" for full width */
    size?: "large" | "x-large" | "full";
    /** True for action button to show spinner and be disabled */
    actionBusy?: boolean;
}
export default class ActionCancelModalComponent extends React.Component<ActionCancelModalComponentProps> {
    render(): React.CElement<import("./ModalPopupComponent").ModalPopupComponentProps, ModalPopupComponent>;
}
