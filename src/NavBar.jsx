import React, { useState } from "react";
import "./NavBar.css";
import { AiFillHome } from "react-icons/ai";
import { FiBookOpen } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import Modal from "react-modal";

// Set modal root
Modal.setAppElement("#root");

function Navbar() {
  const [modalContent, setModalContent] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const openModal = (type) => setModalContent(type);
  const closeModal = () => setModalContent(null);

  const handleInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: "", email: "", message: "" });
    closeModal();
  };

const getModalContent = () => {
  switch (modalContent) {
    case "about":
      return (
        <>
          <h2>🏠 About This Site</h2>
          <p>
            Welcome to <strong>No-Do-List</strong> — your brutally honest productivity buddy.
            <br />
            This app doesn’t just track your tasks, it throws shade when you slack.
            <br />
            Built for the bold, the brave, and the chronically procrastinating.
          </p>
          <p>
            Built using <code>React</code>, served with a shot of sarcasm, and seasoned with push notifications
            that personally roast you.
          </p>
        </>
      );
    case "instructions":
      return (
        <>
          <h2>📖 How To Get Your Life Together</h2>
          <ul>
            <li>➕ Click <strong>Add Task</strong> — duh.</li>
            <li>😈 Ignore the task — get notified with lovingly hostile smack talk.</li>
            <li>✅ Finish it — and feel mildly better about your existence.</li>
            <li>🔁 Repeat — because you're probably not done yet.</li>
          </ul>
          <p>Need motivation? Just wait for the insults.</p>
        </>
      );
    case "developer":
      return (
        <>
          <h2>👨‍💻 Contact the Developer</h2>
          <p>Found a bug? Want to roast me back? Or just want to say hi?</p>
            <form
            action="https://formsubmit.co/marlonpinpin138@gmail.com"
            method="POST"
            className="contact-form"
            >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInput}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInput}
              required
            />
            <textarea
              name="message"
              placeholder="Spill your thoughts here..."
              rows="4"
              value={formData.message}
              onChange={handleInput}
              required
            />
            <button type="submit">
              <span className="button_top">Send Message</span>
            </button>
          </form>
        </>
      );
    default:
      return null;
  }
};


  return (
    <>
      <div className="button-container">
        <button className="button" title="About" onClick={() => openModal("about")}>
          <AiFillHome className="icon" />
        </button>
        <button className="button" title="Instructions" onClick={() => openModal("instructions")}>
          <FiBookOpen className="icon" />
        </button>
        <button className="button" title="Developer" onClick={() => openModal("developer")}>
          <FaUserAlt className="icon" />
        </button>
      </div>

      <Modal
        isOpen={modalContent !== null}
        onRequestClose={closeModal}
        contentLabel="Info Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="close-button">X</button>
        <div>{getModalContent()}</div>
      </Modal>
    </>
  );
}

export default Navbar;
