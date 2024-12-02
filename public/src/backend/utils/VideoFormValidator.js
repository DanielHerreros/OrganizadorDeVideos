class VideoFormValidator {
    constructor(formId) {
        this.form = document.querySelector(`#${formId}`);
        this.errorMessages = new Map();
        this.initializeValidation();
    }
    initializeValidation() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        const inputs = this.form.querySelectorAll('input');
    }
    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        switch (fieldName) {
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
    validateTitle(value) {
        if (value.length < 1) {
            this.showError('title', 'El título del video no puede estar vacío');
            return false;
        }
        this.removeError('title');
        return true;
    }
    validateDescription(value) {
        if (value.length < 1) {
            this.showError('description', 'La descripción no puede estar vacía');
            return false;
        }
        this.removeError('description');
        return true;
    }
    validateVideoFile(files) {
        if (!files || files.length === 0) {
            this.showError('videoFile', 'Debes seleccionar un archivo de video');
            return false;
        }
        this.removeError('videoFile');
        return true;
    }
    showError(fieldName, message) {
        var _a, _b;
        const input = this.form.querySelector(`#${fieldName}-field`);
        let errorDiv = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        input.classList.add('error');
        this.errorMessages.set(fieldName, message);
    }
    removeError(fieldName) {
        var _a;
        const input = this.form.querySelector(`#${fieldName}-field`);
        const errorDiv = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
        this.errorMessages.delete(fieldName);
    }
    handleSubmit(e) {
        e.preventDefault();
        const inputs = this.form.querySelectorAll('input');
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        if (isValid) {
            this.form.submit();
        }
    }
}
export default VideoFormValidator;
