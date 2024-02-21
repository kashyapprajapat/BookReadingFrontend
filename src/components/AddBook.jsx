import { useState } from 'react';
import { z } from 'zod';
import { TextField, Button } from '@mui/material';
import {  useNavigate } from "react-router-dom";

const schema = z.object({
  BOOKNAME: z.string().min(1),
  BOOKAUTHOR: z.string().min(1),
  BOOKGENRE: z.string().min(1),
  BOOKTYPE: z.string().min(1),
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddBookForm = () => {
  const [formValues, setFormValues] = useState({
    BOOKNAME: '',
    BOOKAUTHOR: '',
    BOOKGENRE: '',
    BOOKTYPE: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = schema.parse(formValues);
      setErrors({});

      const response = await fetch(`${API_BASE_URL}/addbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      
      navigate('/')
      // Clear form after successful submission
      setFormValues({
        BOOKNAME: '',
        BOOKAUTHOR: '',
        BOOKGENRE: '',
        BOOKTYPE: '',
      });

      
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
      <TextField
        label="Book Name"
        name="BOOKNAME"
        autoComplete='off'
        value={formValues.BOOKNAME}
        onChange={handleChange}
        error={Boolean(errors.BOOKNAME)}
        helperText={errors.BOOKNAME}
        style={{ marginBottom: '1rem', width: '300px' }}
      />
      <TextField
        label="Book Author"
        name="BOOKAUTHOR"
        autoComplete='off'
        value={formValues.BOOKAUTHOR}
        onChange={handleChange}
        error={Boolean(errors.BOOKAUTHOR)}
        helperText={errors.BOOKAUTHOR}
        style={{ marginBottom: '1rem', width: '300px' }}
      />
      <TextField
        label="Book Genre"
        name="BOOKGENRE"
        autoComplete='off'
        value={formValues.BOOKGENRE}
        onChange={handleChange}
        error={Boolean(errors.BOOKGENRE)}
        helperText={errors.BOOKGENRE}
        style={{ marginBottom: '1rem', width: '300px' }}
      />
      <TextField
        label="Book Type"
        name="BOOKTYPE"
        autoComplete='off'
        value={formValues.BOOKTYPE}
        onChange={handleChange}
        error={Boolean(errors.BOOKTYPE)}
        helperText={errors.BOOKTYPE}
        style={{ marginBottom: '1rem', width: '300px' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ width: '300px' }}>
        Add Book
      </Button>
    </form>
  );
};

export default AddBookForm;
