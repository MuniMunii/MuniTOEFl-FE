import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";

type Props = {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
};

export default function BlockerModal({ isOpen, onAccept, onCancel }: Props){
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
        <AlertDialogContent>
      <AlertDialogTitle>leave and lose it all, or stay and carry on?</AlertDialogTitle>
      <Button type="button" onClick={onAccept}>Leave</Button>
      <Button type="button" onClick={onCancel}>Stay</Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};