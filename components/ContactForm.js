export default function ContactForm() {
    return (
      <form name="contact" method="POST">
        <p class="heading">Contactez nous</p>
        <input type="hidden" name="form-name" value="contact" />
        <p>
            <label htmlFor="name">
                Votre nom / prénom
            </label><br />
            <input type="text" name="name" id="name" placeholder="Patoche Phil"/>
        </p>
        <p>
            <label htmlFor="email">
                Votre Email *
            </label><br />
            <input type="email" required="required" name="email" id="email" placeholder="example@domain.com"/>
        </p>
        <p>
            <label htmlFor="subject">
                Sujet du message *
            </label><br />
            <input type="text" name="subject" id="subject" />
        </p>
        <p>
            <label htmlFor="message">
                Message *
            </label><br />
            <textarea required="required" name="message" id="message"></textarea>
        </p>
        <p class="submit-section">
          <button type="submit" class="submit" >Envoyer</button>
        </p>
      </form>
    )
  }