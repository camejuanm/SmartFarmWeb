import React, { useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import './Authentication.css';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_22rl9vo', 'template_c9ueake', form.current, '5qCkTRANrxpqkVp3X')
        .then((result) => {
            console.log(result.text);
            console.log("message sent");
            alert("message has sent to email");
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <div className="outer">
            <div className="outer-card">
                <div className="card">
                    <StyledContactForm>
                        <form ref={form} onSubmit={sendEmail}>
                            <label for="name">Name</label>
                            <input type="text" name="user_name" className="form-control" placeholder="Input name" />
                            <label for="email">Email</label>
                            <input type="email" name="user_email" className="form-control" placeholder="Input email" />
                            <label>Message</label>
                            <textarea name="message" />
                            <input type="submit" value="Send" />
                        </form>
                    </StyledContactForm>
                </div>
            </div>
        </div>
    );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
    width: 400px;

    form {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        font-size: 16px;
    }
    input {
        width: 70%;
        height: 35px;
        padding: 7px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(220, 220, 220);

        &:focus {
            border: 2px solid rgba(0, 206, 158, 1);
        }
    }
    textarea {
        max-width: 100%;
        min-width: 50%;
        width: 70%;
        max-height: 100px;
        min-height: 100px;
        padding: 7px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(220, 220, 220);

        &:focus {
            border: 2px solid rgba(0, 206, 158, 1);
        }
    }
    label {
        margin-top: 1rem;
    }
    input[type="submit"] {
        margin-top: 2rem;
        cursor: pointer;
        background: rgb(56, 237, 90);
        color: white;
        border: none;
    }
`;