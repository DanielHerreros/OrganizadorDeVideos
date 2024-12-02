interface VideoFormData {
    title: string;
    description: string;
    videoFile: File | null; // Para manejar archivos
}

class VideoFormValidator {
    private form: HTMLFormElement;
    private errorMessages: Map<string, string>;

    constructor(formId: string) {
        this.form = document.querySelector(`#${formId}`) as HTMLFormElement;
        this.errorMessages = new Map();
        this.initializeValidation();
    }

    private initializeValidation(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        const inputs = this.form.querySelectorAll('input');
    }

    private validateField(input: HTMLInputElement): boolean {
        const value = input.value.trim();
        const fieldName = input.name;
        
        switch(fieldName) {
            case 'title':
                return this.validateTitle(value);
            case 'description':
                return this.validateDescription(value);
            case 'videoFile':
                return this.validateVideoFile(input.files);
            default:
                return true;
        }
    }

    private validateTitle(value: string): boolean {
        if (value.length < 1) {
            this.showError('title', 'El título del video no puede estar vacío');
            return false;
        }
        this.removeError('title');
        return true;
    }

    private validateDescription(value: string): boolean {
        if (value.length < 1) {
            this.showError('description', 'La descripción no puede estar vacía');
            return false;
        }
        this.removeError('description');
        return true;
    }

    private validateVideoFile(files: FileList | null): boolean {
        if (!files || files.length === 0) {
            this.showError('videoFile', 'Debes seleccionar un archivo de video');
            return false;
        }
        this.removeError('videoFile');
        return true;
    }

    private showError(fieldName: string, message: string): void {
        const input = this.form.querySelector(`#${fieldName}-field`) as HTMLInputElement;
        let errorDiv = input.parentElement?.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentElement?.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.classList.add('error');
        this.errorMessages.set(fieldName, message);
    }

    private removeError(fieldName: string): void {
        const input = this.form.querySelector(`#${fieldName}-field`) as HTMLInputElement;
        const errorDiv = input.parentElement?.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
        this.errorMessages.delete(fieldName);
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        
        const inputs = this.form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input as HTMLInputElement)) {
                isValid = false;
            }
        });
        if (isValid) {
            this.form.submit();
        }
    }
}

export default VideoFormValidator; 