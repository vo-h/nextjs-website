import {Container, Button} from 'react-bootstrap';
import Expo from '../components/Expo'
import ContactForm from '../components/ContactForm'
import Airtable from 'airtable'
import React, {useState} from 'react';
import NavBar from '../components/NavBar'

export default function Contact() {

  const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY}).base(process.env.NEXT_PUBLIC_AIRTABLE_DB)

  const short_intro=`Your name, email & message will be automatically saved to my private AirTable database.
  The only required field is the message. But if you want me to respond, please provide an email.
  And a name too, if possible. Otherwise, I'll just call you Steve. You won't be getting spam from me, I promise :D`

  const [submit, logSubmit] = useState(0);

  const logFeedback = async event => {
    event.preventDefault() // don't redirect the page

    base('Feedback').create([
      {
        "fields": {
          "Name": event.target.name.value,
          "Email": event.target.email.value,
          "Content": event.target.message.value,
        }
      },
    ], await function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });

    logSubmit(1);
  }

  return (
    <Container className="mb-5">
      <NavBar/>
      <Expo headline="Contact Me ..." text={short_intro}/>

      <Container>
        {submit === 0  ? <ContactForm customSubmit={logFeedback}/> : <h1 className="headline d-flex justify-content-center p-5">Got it!</h1>}
      </Container>
    </Container>
  )
}
