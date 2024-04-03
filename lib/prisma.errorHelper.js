export function prismaErrorHelper(prisma, err) {
    if (err instanceof prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            return {status: 409, message: 'an existing data already exist'}
        }
    }
}