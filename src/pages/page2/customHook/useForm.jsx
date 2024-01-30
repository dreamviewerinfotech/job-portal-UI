import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useForm = (intializeValue, validate) => {
  const [formValue, setFormValue] = useState(intializeValue);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when the input value changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleCancel = () => {
    setFormValue(intializeValue);
  };

  const handleSubmit = async (e, url, navigate) => {
    e.preventDefault();
    const validationErrors = validate(formValue);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        console.log("Submitting form with data:", formValue);
        console.log("Form submitted successfully");
        setFormValue(intializeValue);
        navigate ? Navigate(navigate) : "";
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    formValue,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useForm;
