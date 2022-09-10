import { useState } from 'react';
const ContactForm = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        subject: 'StaticForms - Contact Form',
        honeypot: '',
        message: '',
        replyTo: '@',
        accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY
      });
    
    const [response, setResponse] = useState({
        type: '',
        message: ''
    });

    const handleChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });
    
    const setInitialState = e => {
        document
            .querySelector('.global-error')
            .classList
            .add("is-hidden")
        document
            .querySelectorAll('.error-info')
            .forEach((field) => {field.classList.add("is-hidden");})
            document
                .querySelectorAll('.form-required')
                .forEach((field) => {field.classList.remove("danger-required");})
    }

    const handleRequired = e => {
        setInitialState()
        const isFilled = true
        document
            .querySelectorAll('.form-required')
            .forEach((field) => {
                if (field.value == '') {
                    field.classList.add("danger-required");
                    const error_msg = document.querySelector(`.${field.name}-error`)
                    error_msg.classList.remove("is-hidden")
                }
            })
        if (document.querySelectorAll('.danger-required').length != 0) {
            isFilled = false
            document
                .querySelector('.global-error')
                .classList
                .remove("is-hidden")
        }
        return isFilled
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const isFilled = handleRequired()
        if (isFilled == true) {
            try {
                const res = await fetch('https://api.staticforms.xyz/submit', {
                    method: 'POST',
                    body: JSON.stringify(contact),
                    headers: { 'Content-Type': 'application/json' }
                });
    
                const json = await res.json();
    
                if (json.success) {
                    document.querySelector('form').classList.add('is-hidden');
                    document.querySelector('form').reset()
                    document.querySelector('.success-info').classList.remove('is-hidden');
                    setResponse({
                        type: 'success',
                        message: 'Votre demande de contact a été envoyée avec succès.'
                    });
                } else {
                    setResponse({
                        type: 'error',
                        message: 'Une erreure est survenue.'
                    });
                }
            } catch (e) {
                console.log('An error occurred', e);
                setResponse({
                    type: 'error',
                    message: 'An error occured while submitting the form'
                });
            }
        }
    };
    const handleSuccessClick = e => {
        document.querySelector('.success-info').classList.add('is-hidden');
        document.querySelector('form').classList.remove('is-hidden');      
    };
    return (
        <div>
            <div
                className={
                    response.type === 'success'
                    ? 'success-info'
                    : 'success-info is-hidden'
                }
            >
                <p>Votre message a été envoyé !</p>
                <div class="primary-section">
                    <button 
                        class="primary"
                        onClick={handleSuccessClick}
                    >
                        OK
                    </button>
                </div>
            </div>
            <form action="https://api.staticforms.xyz/submit" method="POST" onSubmit={handleSubmit}>
                <p class="heading">Contactez nous</p>
                <input type="hidden" name="form-name" value="fc23d463-0701-4fbd-8007-3d559cc33e23" />
                <p>
                    <label htmlFor="name">
                        Votre nom / prénom
                    </label><br />
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Patoche Phil" 
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="email">
                        Votre Email *
                    </label><br />
                    <input 
                        type="email" 
                        aria-required="true"
                        name="email" 
                        id="email" 
                        placeholder="example@domain.com"
                        class="form-required"
                        onChange={handleChange}
                    />
                    <span class="email-error error-info is-hidden"><br/>This field is required</span>
                </p>
                <p>
                    <label htmlFor="subject">
                        Sujet du message *
                    </label><br />
                    <input 
                        type="text"
                        aria-required="true"
                        name="subject" 
                        id="subject"
                        class="form-required"
                        onChange={handleChange}
                    />
                    <span class="subject-error error-info is-hidden"><br/>This field is required</span>
                </p>
                <p>
                    <label htmlFor="message">
                        Message *
                    </label><br />
                    <textarea 
                        aria-required="true"
                        name="message" 
                        id="message" 
                        class="form-required"
                        onChange={handleChange}>
                    </textarea>
                    <span class="message-error error-info is-hidden"><br/>This field is required</span>
                </p>
                <p class="submit-section">
                    <button type="submit" class="submit">Envoyer</button>
                </p>
                <p class="global-error error-info is-hidden">
                    Please fill all the required fields
                </p>
            </form>
        </div>
        
    )
};
export default ContactForm;