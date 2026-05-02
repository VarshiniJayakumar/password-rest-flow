const Brevo = require('@getbrevo/brevo');
console.log('Brevo keys:', Object.keys(Brevo));
if (Brevo.TransactionalEmailsApi) {
    console.log('TransactionalEmailsApi is present');
    try {
        const test = new Brevo.TransactionalEmailsApi();
        console.log('Successfully created TransactionalEmailsApi instance');
    } catch (e) {
        console.log('Failed to create instance:', e.message);
    }
} else {
    console.log('TransactionalEmailsApi is NOT present');
}

if (Brevo.default) {
    console.log('Default exists, keys:', Object.keys(Brevo.default));
}
