export const handleFormChange = (e, formData = {}, setFormData = () => { }) => {
    const { name, value, checked, type } = e ? e.target : {};
    if (name) {
        const newFormData = { ...formData };
        newFormData[name] = type === 'checkbox' ? checked : value;
        setFormData(newFormData);
    }
};

export const sanitizePayload = (payload = {}) => {
    return JSON.parse(JSON.stringify(payload));
};