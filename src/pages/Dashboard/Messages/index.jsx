// import useForm from "../../../customHook/useForm";
import "../../../assets/commonFormStyle.css";
import "./messages.css";
import DashboardWrapper from "../../DashboardWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Messages = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      console.log("working");
      const response = await axios.post(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Contact-Route/addContact",
        formData
      );

      console.log("server response", response.data.Query);

      if (response.status === 201) {
        toast("Message Sent Successfully");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      toast("Something Went Wrong.");
    }
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <DashboardWrapper>
      <ToastContainer />
      <section className="messages">
        <div className="row-special row-1">
          <div className="col col-12 col-a">
            <form action="" onSubmit={sendMessage}>
              <div className="form_header">
                <h3>Messages</h3>
              </div>
              <div className="form_details">
                <div className="row-special row-2">
                  <div className="col col-12 col-md-6 col-a-a">
                    {/*<label htmlFor="name">Name</label>*/}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                  <div className="col col-12 col-md-6 col-a-b">
                    {/*<label htmlFor="email">Email</label>*/}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-c">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-d">
                    {/*<label htmlFor="message">Message</label>*/}
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      rows="7"
                    ></textarea>
                  </div>

                  <div className="col col-12 col-a-l">
                    <button type="submit">Send</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Messages;
