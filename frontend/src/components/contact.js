import React, { PureComponent } from 'react';

class Contact extends PureComponent {
    state = {
        contactEmail: '',
        contactMessage: '',
        successMsg: ''
    };

    handleChange = (e) => {
        this.setState({
            contactEmail: e.target.value,
        });
    }

    handleChangeMsg = (e) => {
        this.setState({
            contactMessage: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        $.ajax({
            url: process.env.NODE_ENV !== "production" ? '/getMail' : "./php/mailer.php",
            // url: "./php/mailer.php",
            type: 'POST',
            data: {
                'form_email': this.state.contactEmail,
                'form_msg': this.state.contactMessage
            },
            success: function(data) {
                this.setState({
                    successMsg: '<div class="sucessMessage"><h1>Kontakt skickad!</h1><p>Återkommer så fort som möjligt.</p></div>'
                });
                $('#formContact').slideUp();
                $('#formContact').after(this.state.successMsg);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr, status);
                console.log(err);
                this.setState({
                    contactMessage: 'Sorry det blev fel. Försök gärna igen, eller mejla mig direkt på magdamargaretha@gmail.com',
                });
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="contact" id="contact">
                <div className="filter">
                    <form className="form" onSubmit={this.handleSubmit} id="formContact">
                        <input
                            id="formEmail"
                            type="email"
                            placeholder="email"
                            name="formEmail"
                            value={this.state.contactEmail}
                            onChange={this.handleChange}
                            required
                        />

                        <textarea
                            id="formMsg"
                            name="formMsg"
                            placeholder="meddelande"
                            rows="8"
                            cols="40"
                            value={this.state.contactMessage}
                            onChange={this.handleChangeMsg}></textarea>

                        <input
                            type="submit"
                            value="Skicka"
                            className="btn--cta"
                            id="btn-submit"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Contact;
