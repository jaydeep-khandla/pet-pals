import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function DetailDialog({ openDialog, closeDialog, application }) {

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent className="bg-card text-card-foreground p-6 rounded-lg sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Adoption Application Details</DialogTitle>
                    <DialogDescription>Full details of the application submitted by {application.fullName}</DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto pr-6">
                    <div className="grid gap-4 py-4">
                        <div>
                            <strong>Full Name:</strong> {application.fullName}
                        </div>
                        <div>
                            <strong>Email:</strong> {application.email}
                        </div>
                        <div>
                            <strong>Address:</strong> {application.address}
                        </div>
                        <div>
                            <strong>City:</strong> {application.city}
                        </div>
                        <div>
                            <strong>State:</strong> {application.state}
                        </div>
                        <div>
                            <strong>Zip Code:</strong> {application.zipCode}
                        </div>
                        <div>
                            <strong>Phone Number:</strong> {application.phoneNumber}
                        </div>
                        <div>
                            <strong>Age Range:</strong> {application.ageRange}
                        </div>
                        <div>
                            <strong>Residence Type:</strong> {application.residenceType}
                        </div>
                        <div>
                            <strong>Own/Rent:</strong> {application.ownRent}
                        </div>
                        {application.landlordContact && (
                            <div>
                                <strong>Landlord Contact:</strong> {application.landlordContact}
                            </div>
                        )}
                        <div>
                            <strong>Number of Adults:</strong> {application.numAdults}
                        </div>
                        <div>
                            <strong>Number of Children:</strong> {application.numChildren}
                        </div>
                        <div>
                            <strong>Yard:</strong> {application.yard}
                        </div>
                        <div>
                            <strong>Current Pets:</strong> {application.currentPets}
                        </div>
                        <div>
                            <strong>Previous Pets:</strong> {application.previousPets}
                        </div>
                        <div>
                            <strong>Pet Experience:</strong> {application.petExperience}
                        </div>
                        <div>
                            <strong>Work Schedule:</strong> {application.workSchedule}
                        </div>
                        <div>
                            <strong>Alone Time:</strong> {application.aloneTime} hours
                        </div>
                        <div>
                            <strong>Adoption Reason:</strong> {application.adoptionReason}
                        </div>
                        <div>
                            <strong>Financial Commitment:</strong> {application.financialCommitment}
                        </div>
                        <div>
                            <strong>Status:</strong> {application.status}
                        </div>
                        <div>
                            <strong>Adoption Date:</strong> {new Date(application.adoptionDate).toLocaleDateString()}
                        </div>
                        <div>
                            <strong>Agree to Terms:</strong> {application.agreeTerms ? "Yes" : "No"}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={closeDialog}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
