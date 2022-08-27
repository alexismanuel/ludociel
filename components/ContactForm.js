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

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: { 'Content-Type': 'application/json' }
            });

            const json = await res.json();

            if (json.success) {
                setResponse({
                    type: 'success',
                    message: 'Votre demande de contact a été envoyé avec succès.'
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
    };
    return (
        <form action="https://api.staticforms.xyz/submit" method="POST" onSubmit={handleSubmit}>
            <div
                className={
                    response.type === 'success'
                    ? 'tile box notification is-primary'
                    : 'is-hidden'
                }
            >
                <p>{response.message}</p>
            </div>
            <div
                className={
                    response.type === 'error'
                    ? 'tile box notification is-danger'
                    : 'is-hidden'
                }
            >
                <p>{response.message}</p>
            </div>
            <p class="heading">Contactez nous</p>
            <input type="hidden" name="form-name" value="fc23d463-0701-4fbd-8007-3d559cc33e23" />
            <p>
                <label htmlFor="name">
                    Votre nom / prénom
                </label><br />
                <input type="text" name="name" id="name" placeholder="Patoche Phil" onChange={handleChange}/>
            </p>
            <p>
                <label htmlFor="email">
                    Votre Email *
                </label><br />
                <input type="email" required="required" name="email" id="email" placeholder="example@domain.com" onChange={handleChange}/>
            </p>
            <p>
                <label htmlFor="subject">
                    Sujet du message *
                </label><br />
                <input type="text" name="subject" id="subject" onChange={handleChange}/>
            </p>
            <p>
                <label htmlFor="message">
                    Message *
                </label><br />
                <textarea required="required" name="message" id="message" onChange={handleChange}></textarea>
            </p>
            <p class="submit-section">
                <button type="submit" class="submit">Envoyer</button>
            </p>
        </form>
    )
};
export default ContactForm;