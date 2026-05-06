export class BaseController {
    protected handleError(error: any): void {
        console.error('Controller error:', error);
        throw error;
    }

    protected validateRequired(data: any, fields: string[]): void {
        for (const field of fields) {
            if (!data[field] && data[field] !== 0) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
    }
}