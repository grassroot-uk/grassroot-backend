import { PrismaClient } from "@prisma/client";

const createCategories = async (prisma: PrismaClient, userId: string) => {
    await prisma.category.createMany({
        data: [
            {
                name: "Electronics",
                type: "CATEGORY",
                ownerId: userId
            },
            {
                name: "Arts",
                type: "CATEGORY",
                ownerId: userId
            },
            {
                name: "Social",
                type: "CATEGORY",
                ownerId: userId
            },
            {
                name: "Consumer Goods",
                type: "CATEGORY",
                ownerId: userId
            },
            {
                name: "Service",
                type: "CATEGORY",
                ownerId: userId
            },
            {
                name: "Others",
                type: "CATEGORY",
                ownerId: userId
            },
        ]
    })
}

export default createCategories;