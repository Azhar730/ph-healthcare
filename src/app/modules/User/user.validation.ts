import { Gender, UserStatus } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
    password: z.string({
        message: "Password is required"
    }),
    admin: z.object({
        name: z.string({
            message: "Name is required!"
        }),
        email: z.string({
            message: "Email is required!"
        }),
        contactNumber: z.string({
            message: "Contact Number is required!"
        })
    })
});

const createDoctor = z.object({
    password: z.string({
        message: "Password is required"
    }),
    doctor: z.object({
        name: z.string({
            message: "Name is required!"
        }),
        email: z.string({
            message: "Email is required!"
        }),
        contactNumber: z.string({
            message: "Contact Number is required!"
        }),
        address: z.string().optional(),
        registrationNumber: z.string({
            message: "Reg number is required"
        }),
        experience: z.number().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE]),
        appointmentFee: z.number({
            message: "appointment fee is required"
        }),
        qualification: z.string({
            message: "quilification is required"
        }),
        currentWorkingPlace: z.string({
            message: "Current working place is required!"
        }),
        designation: z.string({
            message: "Designation is required!"
        })
    })
});

const createPatient = z.object({
    password: z.string(),
    patient: z.object({
        email: z.string({
            message: "Email is required!"
        }).email(),
        name: z.string({
            message: "Name is required!"
        }),
        contactNumber: z.string({
            message: "Contact number is required!"
        }),
        address: z.string({
            message: "Address is required"
        })
    })
});

const updateStatus = z.object({
    body: z.object({
        status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
    })
})

export const UserValidation = {
    createAdmin,
    createDoctor,
    createPatient,
    updateStatus
}