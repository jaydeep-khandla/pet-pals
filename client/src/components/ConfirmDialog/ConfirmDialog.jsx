import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogHeader, AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import PropTypes from "prop-types";

export default function ConfirmDialog({ openDialog, closeDialog, onSubmit }) {
    return (
        <AlertDialog open={openDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. The application cannot be withdrawn after submitted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

ConfirmDialog.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};