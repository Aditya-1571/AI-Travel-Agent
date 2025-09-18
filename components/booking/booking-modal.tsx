"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { BookingFlow } from "./booking-flow"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  type: "flight" | "hotel" | "restaurant" | "place"
  item: any
}

export function BookingModal({ isOpen, onClose, type, item }: BookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <BookingFlow type={type} item={item} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
