"use client"

import { Bell } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ChangelogDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ChangelogDialog({ isOpen, onOpenChange }: ChangelogDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-blue-400" />
            Change Log
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Instagram Service Prices Update</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Instagram recently rolled out a new security update that affected many of our services. We've restored
              them all, but prices are currently higher due to the extra resources needed to bypass the new system. As
              our bypass becomes faster and more optimized over the coming days and weeks, prices will gradually return
              to normal.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
